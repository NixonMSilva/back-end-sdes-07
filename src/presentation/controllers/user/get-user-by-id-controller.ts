import { badRequest, notFound, ok, serverError } from '../../helpers'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { type GetUserById } from '../../../domain/usecases'

export class GetUserByIdController implements Controller {
  constructor (private readonly getUserById: GetUserById) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params.userId) {
        return badRequest(new Error('User ID is required'))
      }

      const userId = Number(request.params.userId)
      const result = await this.getUserById.getById(userId)

      if (result) {
        return ok(result)
      }

      return notFound()
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
