import { badRequest, notFound, ok, serverError } from '../../helpers'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { type DisableUser } from '../../../domain/usecases'

export class DisableUserController implements Controller {
  constructor (private readonly disableUser: DisableUser) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new Error('User ID is required'))
      }

      const userId = Number(request.body.userId)
      const status = await this.disableUser.disable(userId)

      if (status) {
        return ok('User disabled')
      }

      return notFound()
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
