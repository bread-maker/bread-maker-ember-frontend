// ----- Ember modules -----
import Component from 'ember-component'
import service from 'ember-service/inject'

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed'

// ----- Third-party libraries -----

// ----- Own modules -----
import {convertTemp, getUnit} from 'bread-maker-ember-frontend/helpers/format-temp'



export default Component.extend({

  // ----- Arguments -----
  data   : undefined,
  locale : undefined,

  currentIntervalOption : undefined,
  intervalOptions       : undefined,

  updateIntervalAction : undefined,



  // ----- Services -----
  intl : service(),



  // ----- Overridden properties -----
  classNames : ['statsChart'],



  // ----- Properties -----



  // ----- Computed properties -----
  options : computed(
    'locale', 'intl',
    (locale,   intl) => {
      const temp = intl.t('domain.state-labels.temp')
      const unit = getUnit(locale)

      return {
        animation  : false,
        responsive : true,
        scales     : {
          yAxes : [
            {
              id       : "temp",
              type     : "linear",
              position : "left",
              ticks    : {
                beginAtZero : true,
                min         : convertTemp(0, locale),
              },
              scaleLabel : {
                display     : true,
                labelString : `${temp} (${unit})`,
              },
            },
            {
              id         : "motor",
              type       : "category",
              position   : "right",
              scaleLabel : {
                display     : true,
                labelString : intl.t('domain.state-labels.motor'),
              },
            },
          ],
        },
      }
    }
  ),



  // ----- Overridden Methods -----



  // ----- Methods -----



  // ----- Events and observers -----



  // ----- Tasks -----



  // ----- Actions -----
  // actions: {
  // }
})
