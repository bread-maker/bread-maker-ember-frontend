export default function filterObject (object, callback) {
  return Object
    .keys(object)
    .reduce((result, key) => {
      const value = object[key]
      if (callback(key, value)) result[key] = value
      return result
    }, {})
}
