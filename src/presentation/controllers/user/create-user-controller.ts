import { type Encrypter, badRequest, conflict, ok, serverError } from '../../helpers'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { type CreateUser } from '../../../domain/usecases'

export class CreateUserController implements Controller {
  constructor (
    private readonly createUser: CreateUser,
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

      const password: string = request.body.password
      const hashedPassword = await this.encrypter.encrypt(password)

      const user = await this.createUser.create({
        email: request.body.email,
        password: hashedPassword,
        type: 1
      })

      if (user) {
        return ok(user)
      }

      return conflict(new Error('User already exists'))
    } catch (error) {
      console.error({ error })
      return serverError()
    }
  }
}
