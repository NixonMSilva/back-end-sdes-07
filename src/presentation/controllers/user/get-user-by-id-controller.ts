import { badRequest, ok, serverError } from '@/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { type GetUserById } from '@/domain/usecases'

export class GetUserByIdController implements Controller {
  constructor (private readonly getUserById: GetUserById) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.userId) {
        return badRequest(new Error('User ID is required'))
      }

      const userId = Number(request.body.userId)
      const result = await this.getUserById.getById(userId)

      return ok(result)
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
