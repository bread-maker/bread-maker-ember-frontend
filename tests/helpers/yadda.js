import yadda from 'npm:yadda'
import _ from "lodash"

export default yadda


// https://github.com/acuminous/yadda/blob/master/examples/data-tables/library.js
export const dictionary = new yadda.Dictionary()
  .define("totals", /(\d+)/, yadda.converters.integer)
  .define("list", /([^\u0000]*)/, yadda.converters.list)
  .define("table", /([^\u0000]*)/, yadda.converters.table)

function throwInvalidStepError (text, type, values) {
  const texts = values.map(str => `"${str}"`).join(", ")
  throw new Error(`step has invalid ${type}: "${text}", expected one of: ${texts}`)
}

export function convertTextToValue__array (text, type, valuesArray) {
  if (!valuesArray.includes(text)) {
    throwInvalidStepError(text, type, valuesArray)
  }

  return text
}

export function convertTextToValue__object (text, type, valuesMap) {
  const value = valuesMap[text]

  if (value === undefined) {
    throwInvalidStepError(text, type, Object.keys(valuesMap))
  }

  return value
}

export function convertTextToValue (text, type, valuesMapOrArray) {
  text = (text || "").toLowerCase().trim()

  if (_.isArray(valuesMapOrArray)) {
    return convertTextToValue__array(text, type, valuesMapOrArray)
  }

  if (_.isObject(valuesMapOrArray)) {
    return convertTextToValue__object(text, type, valuesMapOrArray)
  }

  throw new Error("error in step implementation: expected convertTextToValue to accept object or array as third argument")
}
