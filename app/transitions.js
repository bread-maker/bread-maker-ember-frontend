export default function () {
  // Add your transitions here, like:
  this.transition(
    this.hasClass('-horizontal'),
    this.use('toLeft'),
    this.reverse('toRight')
  )
}
