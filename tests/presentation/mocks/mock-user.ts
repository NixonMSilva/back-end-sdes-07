import type {
  CreateUser,
  CreateUserInput,
  CreateUserOutput,
  DisableUser,
  GetUserById,
  GetUserOutput,
  Login,
  LoginOutput
} from '../../../src/domain/usecases'
import { mockUserLoginOutput, mockUserModel } from '../../domain/mocks'

export class CreateUserSpy implements CreateUser {
  input: CreateUserInput
  output = mockUserModel()

  async create (user: CreateUserInput): Promise<CreateUserOutput> {
    this.input = user

    return this.output
  }
}

export class DisableUserSpy implements DisableUser {
  input: number

  async disable (userId: number): Promise<boolean> {
    this.input = userId
    if (userId === 999) {
      return true
    }

    return false
  }
}

export class GetUserByIdSpy implements GetUserById {
  input: number
  output = mockUserModel()

  async getById (userId: number): Promise<GetUserOutput> {
    this.input = userId
    if (userId === 999) {
      return this.output
    }
    return null
  }
}

export class LoginSpy implements Login {
  input: { email: string, password: string }
  output = mockUserLoginOutput()

  async login (email: string, password: string): Promise<LoginOutput> {
    this.input = {
      email,
      password
    }

    if (this.input.email === 'any_email@mail.com' && this.input.password === 'any_password') {
      return this.output
    }

    return null
  }
}
