import type {
  CreateUserRepository,
  CreateUserRepositoryInput,
  CreateUserRepositoryOutput,
  DisableUserRepository,
  GetUserByIdRepository,
  GetUserByIdRepositoryOutput,
  LoginRepository,
  LoginRepositoryOutput
} from '../../../src/data/protocols'
import { mockUserLoginOutput, mockUserModel } from '../../domain/mocks'

export class CreateUserRepositorySpy implements CreateUserRepository {
  input: CreateUserRepositoryInput
  output = mockUserModel()

  async create (user: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput> {
    this.input = user
    return this.output
  }
}

export class DisableUserRepositorySpy implements DisableUserRepository {
  input: number

  async disable (userId: number): Promise<boolean> {
    this.input = userId
    if (this.input === 999) {
      return true
    }

    return false
  }
}

export class GetUserByIdRepositorySpy implements GetUserByIdRepository {
  input: number
  output = mockUserModel()

  async getById (userId: number): Promise<GetUserByIdRepositoryOutput> {
    this.input = userId
    if (this.input === 999) {
      return this.output
    }

    return null
  }
}

export class LoginRepositorySpy implements LoginRepository {
  input: { email: string, password: string }
  output = mockUserLoginOutput()

  async login (email: string, password: string): Promise<LoginRepositoryOutput> {
    this.input = {
      email,
      password
    }

    if (this.input.email === 'any_email' && this.input.password === 'any_password') {
      return this.output
    }

    return null
  }
}
