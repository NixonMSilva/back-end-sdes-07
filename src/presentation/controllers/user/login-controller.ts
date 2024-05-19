import { type Encrypter, badRequest, ok, serverError, signToken, unauthorized } from '../../helpers'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { type Login } from '../../../domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly login: Login,
    private readonly encrypter: Encrypter
  ) {}

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

      // Check if user exists
      if (!user) {
        return unauthorized()
      }

      // Check if passwords match
      const isValidPassword = await this.encrypter.compare(password, user.password)
      if (!isValidPassword) {
        return unauthorized()
      }

      // Generate token
      const token = signToken(
        String(user.id),
        user.email)

      if (user) {
        const filteredUser = { ...user, password: undefined }
        return ok({ ...filteredUser, token })
      }

      return unauthorized()
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
