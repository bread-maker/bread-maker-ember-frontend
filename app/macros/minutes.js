import computed from 'ember-macro-helpers/computed'



export default function minutesMacro (key) {
  return computed(key, {
    get (value = 0) {
      return Math.round(value / 60)
    },

    set (valueMins) {
      this.set(key, valueMins * 60)
      return valueMins
    },
  })
}
