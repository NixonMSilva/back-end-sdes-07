import { MissingParamError } from '../errors'
import { ok, forbidden, unauthorized, validateToken } from '../helpers'
import type { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken: string = httpRequest.headers?.authorization?.replace('Bearer ', '')

      // Returns forbidden access if token is poorly formatted or it doesn't exist
      if (!accessToken) {
        return forbidden(new MissingParamError('accessToken'))
      }

      // Decode token
      const decodedToken = validateToken(accessToken)

      if (decodedToken.id !== undefined &&
        decodedToken.email !== undefined) {
        return ok({ decodedToken })
      }

      // Returns forbidden if otherwise
      return forbidden(new Error('Access Denied'))
    } catch (error) {
      return unauthorized()
    }
  }
}
