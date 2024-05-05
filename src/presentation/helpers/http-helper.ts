import { NotAcceptableError, NotFoundError, ServerError, UnauthorizedError } from '../errors'
import type { HttpResponse } from '../protocols'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})

export const notAcceptable = (): HttpResponse => ({
  statusCode: 406,
  body: new NotAcceptableError()
})

export const conflict = (body: any): HttpResponse => ({
  statusCode: 409,
  body
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const gatewayTimeout = (gatewayApiName: string): HttpResponse => ({
  statusCode: 504,
  body: new Error(`Gateway Timeout for API: ${gatewayApiName}`)
})
