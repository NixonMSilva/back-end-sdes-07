import { badRequest, conflict, ok, serverError } from '../../helpers'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { type CreateUser } from '../../../domain/usecases'

import * as bcrypt from 'bcrypt'

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

      const password: string = request.body.password
      const hashedPassword = await bcrypt.hash(password, 10)

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
