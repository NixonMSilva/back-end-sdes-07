import { badRequest, ok, serverError } from '@/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { type CreateUser } from '@/domain/usecases'

export class CreateUserController implements Controller {
  constructor (private readonly createUser: CreateUser) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.email) {
        return badRequest(new Error('Email is required'))
      }
      if (!request.body.password) {
        return badRequest(new Error('Password is required'))
      }

      const user = await this.createUser.create({
        email: request.body.email,
        password: request.body.password,
        type: 1
      })

      return ok(user)
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
