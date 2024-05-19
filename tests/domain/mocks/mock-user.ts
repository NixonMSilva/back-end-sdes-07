import type { CreateUserInput, GetUserOutput, LoginOutput } from '../../../src/domain/usecases'

export const mockUserModel = (): GetUserOutput => ({
  id: 999,
  createdAt: new Date('2020-01-01T00:00:00.000Z'),
  updatedAt: new Date('2020-01-01T00:00:00.000Z'),
  lastLoginAt: new Date('2020-01-01T00:00:00.000Z'),
  name: 'any_name',
  email: 'any_email',
  type: 1
})

export const mockUserLoginOutput = (): LoginOutput => ({
  id: 999,
  password: 'any_password',
  createdAt: new Date('2020-01-01T00:00:00.000Z'),
  updatedAt: new Date('2020-01-01T00:00:00.000Z'),
  lastLoginAt: new Date('2020-01-01T00:00:00.000Z'),
  name: 'any_name',
  email: 'any_email',
  type: 1
})

export const mockCreateUserInput = (): CreateUserInput => ({
  email: 'any_email',
  password: 'any_password',
  type: 1
})
