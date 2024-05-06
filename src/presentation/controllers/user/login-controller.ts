import { badRequest, ok, serverError } from '@/presentation/helpers'
import type { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { type Login } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (private readonly login: Login) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.email) {
        return badRequest(new Error('Email is required'))
      }
      if (!request.body.password) {
        return badRequest(new Error('Password is required'))
      }

      const email: string = request.body.email
      const password: string = request.body.password

      const user = await this.login.login(email, password)

      return ok(user)
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
