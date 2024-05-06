import { type UserModel } from '../../../src/domain/models'

export const mockUserModel = (): UserModel => ({
  id: 999,
  createdAt: new Date('2020-01-01T00:00:00.000Z'),
  updatedAt: new Date('2020-01-01T00:00:00.000Z'),
  lastLoginAt: new Date('2020-01-01T00:00:00.000Z'),
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  type: 1
})
