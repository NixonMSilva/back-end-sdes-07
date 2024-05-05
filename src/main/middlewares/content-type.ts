import { type RequestHandler } from 'express'

export const contentType: RequestHandler = (request, response, next): void => {
  response.type('json')
  next()
}
