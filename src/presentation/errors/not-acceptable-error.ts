export class NotAcceptableError extends Error {
  constructor () {
    super('Not acceptable')
    this.name = 'NotAcceptableError'
  }
}
