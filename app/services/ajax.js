// ----- Ember modules -----
import { inject as service } from '@ember/service'
import {camelize, decamelize} from '@ember/string'
import { get } from '@ember/object'

// ----- Ember Addon modules -----
import writable from 'ember-macro-helpers/writable'
import AjaxService from 'ember-ajax/services/ajax'

// ----- Third-party modules -----
import _ from 'lodash'
import $ from 'jquery'
import RSVP from 'rsvp'



export default AjaxService.extend({

  // ----- Services -----
  config  : service(),
  session : service(),



  // ----- Overridden properties -----
  host : writable('config.backendUrl'),


  // ----- Static properties -----



  // ----- Computed properties -----




  // ----- Overridden Methods -----
  normalizeErrorResponse (status, headers, payload) {
    return {
      payload,
      headers,
      status,
    }
  },



  // ----- Custom Methods -----
  buildUrlQueryParams (params = {}) {
    if (!Object.keys(params).length) return ''
    const serializedParams = $.param(params)
    return `?${serializedParams}`
  },

  getMethod (method, params = {}, options = {}) {
    const token = this.get('session.data.authenticated.token')

    params = {
      method,
      ...params,
      ...(token ? {token} : {}),
    }

    params = this._decamelizeKeys_(params)

    const finalUrl = this.buildUrlQueryParams(params)

    return this
      .request(finalUrl)
      .then(this._camelizeKeys_)
      .catch(error => this._logOutOnTokenExpired(error, options.preventLogoutOnAuthError))
      .catch(error => RSVP.reject(this._formatError(error)))
  },

  postMethod (method, data = {}, options = {}) {
    const finalUrl = this.buildUrlQueryParams({method})
    const token = this.get('session.data.authenticated.token')

    data = {
      ...data,
      ...(token ? {token} : {}),
    }

    data = this._decamelizeKeys_(data)

    return this
      .post(finalUrl, {data})
      .then(this._camelizeKeys_)
      .catch(error => this._logOutOnTokenExpired(error, options.preventLogoutOnAuthError))
      .catch(error => RSVP.reject(this._formatError(error)))
  },


  login (password, params = {}) {
    return this.getMethod('auth.login', {password, ...params})
  },


  logout (params = {}) {
    return this.getMethod('auth.logout', params)
  },

  getStats (interval = '', params = {}) {
    return this.getMethod('stats', {interval, ...params})
  },

  getTimezone (params = {}) {
    return this
      .getMethod('config.timezone.get', params)
      .then(({timezone}) => timezone)
  },

  setPassword (password, new_password, params = {}) {
    return this.postMethod(
      'auth.passwd',
      {password, new_password, ...params},
      {preventLogoutOnAuthError : true}
    )
  },

  _globalBakingConfigMapping : {
    maxTempBeforeTimer  : 'max_temp_a',
    maxTempBeforeBaking : 'max_temp_b',
    maxTempAfterBaking  : 'warm_temp',
    maxTempDuration     : 'max_warm_time',
  },

  getGlobalBakingConfig (params = {}) {
    return this
      .getMethod('config.baking.global.get', params)
      .then(({config}) => config)
      .then(config => this._mapKeysReverse(config, this._globalBakingConfigMapping))
  },

  setGlobalBakingConfig (config, params = {}) {
    config = this._mapKeys(config, this._globalBakingConfigMapping)
    config = this._decamelizeKeys_(config)

    return this
      .postMethod('config.baking.global.set', {config, ...params})
      .then(({config}) => config)
      .then(config => this._mapKeysReverse(config, this._globalBakingConfigMapping))
  },

  _programMapping : {
    programId : 'program_id',
    crustId   : 'crust_id',
    name      : 'program_name',

    maxTempBeforeTimer  : 'max_temp_a',
    maxTempBeforeBaking : 'max_temp_b',
    maxTempAfterBaking  : 'warm_temp',
    maxTempDuration     : 'max_warm_time',

    stages : 'stages',
    beeps  : 'beeps',
  },

  _stageMapping : {
    stageName : 'stage_name',
    temp      : 'temp',
    motor     : 'motor',
    duration  : 'duration',
  },

  _beepMapping : {
    stage : 'stage',
    time  : 'time',
    count : 'count',
  },

  _serializeProgram (sourceProgram) {
    const program = this._mapKeys(sourceProgram, this._programMapping)

    return {
      ...program,
      stages : program.stages && program.stages.map(stage => this._mapKeysReverse(stage, this._stageMapping)),
      beeps  : program.beeps  && program.beeps .map(beep  => this._mapKeysReverse(beep,  this._beepMapping)),
    }
  },

  _deserializeProgram (payload) {
    const program = this._mapKeysReverse(payload, this._programMapping)

    return {
      ...program,
      stages : program.stages && program.stages.map(stage => this._mapKeysReverse(stage, this._stageMapping)),
      beeps  : program.beeps  && program.beeps .map(beep  => this._mapKeysReverse(beep,  this._beepMapping)),
      id     : `${program.programId}-${program.crustId}`,
    }
  },

  getProgram (program_id, crust_id, params = {}) {
    return this
      .getMethod('config.baking.stages.get', {program_id, crust_id, ...params})
      .then(({program}) => this._deserializeProgram(program))
  },

  getPrograms (params = {}) {
    return this
      .getMethod('config.baking.stages.get.all', params)
      .then(({programs}) => programs.map(program => this._deserializeProgram(program)))
  },

  setProgram (sourceProgram, params = {}) {
    const program_id = get(sourceProgram, 'programId')
    const crust_id   = get(sourceProgram, 'crustId')
    const program    = this._serializeProgram(sourceProgram)

    return this
      .postMethod('config.baking.stages.set', {program_id, crust_id, program, ...params})
      .then(({program}) => this._deserializeProgram(program))
  },

  // setGlobalBakingConfig (config, params = {}) {
  //   config = this._mapKeys(config, this._globalBakingConfigMapping)
  //   config = this._decamelizeKeys_(config)
  //
  //   return this
  //     .postMethod('config.baking.global.set', {config, ...params})
  //     .then(({config}) => config)
  //     .then(this._camelizeKeys_)
  //     .then(config => this._mapKeysReverse(config, this._globalBakingConfigMapping))
  // },

  getMiscConfig (params = {}) {
    return this
      .getMethod('config.misc.get', params)
      .then(({config}) => config)
      .then(this._camelizeKeys_)
  },

  setMiscConfig (key, value, params = {}) {
    key = decamelize(key)

    return this
      .postMethod('config.misc.set', {key, value, params})
      .then(({config}) => config)
      .then(this._camelizeKeys_)
  },

  confirmAuth (token, params = {}) {
    return this.getGlobalBakingConfig({token, ...params})
  },



  // ----- Private methods -----
  _logOutOnTokenExpired (error, preventLogout = false) {
    if (
      !preventLogout
      && this.isUnauthorizedError(error)
      && this.get('session.isAuthenticated')
    ) {
      this.get('session').invalidate()
    }

    return RSVP.reject(error)
  },

  _formatError (error) {
    const errorObj = get(error, 'payload.payload.error')

    const payload =
        errorObj
          ? this._camelizeKeys_(error.payload.payload.error)
          : get(error, 'payload.payload')

    return {
      payload,
      name    : error.name,
      message : error.message,
      stack   : error.stack,
      status  : get(error, 'payload.status'),
      headers : get(error, 'payload.headers'),

      /* eslint-disable indent */
      type :
        this.isUnauthorizedError(error) ? 'unauthorized' :
        this.isForbiddenError(error)    ? 'forbidden' :
        this.isInvalidError(error)      ? 'invalid' :
        this.isBadRequestError(error)   ? 'bad request' :
        this.isNotFoundError(error)     ? 'not found' :
        this.isAbortError(error)        ? 'abort' :
        this.isConflictError(error)     ? 'conflict' :
        this.isServerError(error)       ? 'server' :
                                          'unknown',
      /* eslint-enable indent */
    }
  },

  _setAutorun (enabled, params = {}) {
    enabled = enabled ? 1 : 0
    return this.postMethod('emu.autorun', {enabled, forceauth : true,  ...params})
  },

  _setEmuTemp (temp, params = {}) {
    return this.postMethod('emu.temp', {temp, ...params})
  },

  _camelizeKeys_ (obj) {
    return _.mapKeys(obj, (value, key) => camelize(key))
  },

  _decamelizeKeys_ (obj) {
    return _.mapKeys(obj, (value, key) => decamelize(key))
  },

  _mapKeys (obj, mapping) {
    return Object.keys(mapping).reduce((result, key) => {
      const resultingKey = mapping[key]
      if (obj.hasOwnProperty(key)) result[resultingKey] = obj[key]
      return result
    }, {})
  },

  _mapKeysReverse (obj, mapping) {
    return Object.keys(obj).reduce((result, key) => {
      const resultingKey = _.findKey(mapping, value => value === key)
      if (resultingKey) result[resultingKey] = obj[key]
      return result
    }, {})
  },



  // ----- Events and observers -----



  // ----- Tasks -----

})
