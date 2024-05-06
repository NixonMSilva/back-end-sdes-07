import { type UserModel } from '@/domain/models'

export type CreateUserInput = Pick<UserModel, 'email' | 'password' | 'type'>
export type CreateUserOutput = Omit<UserModel, 'password'>

export interface CreateUser {
  create: (data: CreateUserInput) => Promise<CreateUserOutput>
}
