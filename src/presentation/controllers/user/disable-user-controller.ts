import { badRequest, ok, serverError } from '@/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { type DisableUser } from '@/domain/usecases'

export class DisableUserController implements Controller {
  constructor (private readonly disableUser: DisableUser) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new Error('User ID is required'))
      }

      const userId = Number(request.body.userId)
      const status = await this.disableUser.disable(userId)

      return ok(status)
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
