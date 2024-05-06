import { type UserModel } from '../../models'

export type CreateUserInput = Pick<UserModel, 'email' | 'password' | 'type'>
export type CreateUserOutput = Omit<UserModel, 'password'> | null

export interface CreateUser {
  create: (data: CreateUserInput) => Promise<CreateUserOutput>
}
