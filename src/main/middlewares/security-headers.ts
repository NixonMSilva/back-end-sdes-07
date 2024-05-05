import { type RequestHandler } from 'express'

export const securityHeaders: RequestHandler = (request, response, next): void => {
  response.set('referrer-policy', 'no-referrer-when-downgrade')
  response.set('strict-transport-security', 'max-age=15768000; includeSubDomains')
  response.set('x-frame-options', 'SAMEORIGIN')
  next()
}
