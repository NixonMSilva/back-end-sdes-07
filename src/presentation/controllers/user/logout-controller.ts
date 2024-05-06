import { badRequest, ok, serverError } from '@/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { type Logout } from '@/domain/usecases'

export class LogoutController implements Controller {
  constructor (private readonly logout: Logout) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new Error('Email is required'))
      }

      const userId = Number(request.body.userId)

      await this.logout.logout(userId)

      return ok('user logged out')
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
