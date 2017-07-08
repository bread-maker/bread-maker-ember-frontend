// ----- Ember modules -----

// ----- Ember addons -----

// ----- Third-party libraries -----

// ----- Own modules -----



export default function arrayPadLeft (array, amount, filler) {
  const paddingLength = amount - array.length

  if (paddingLength <= 0) return array

  const padding = _.times(paddingLength, i => {
    return _.isFunction(filler) ? filler(i) : filler
  })

  return padding.concat(array)
}
