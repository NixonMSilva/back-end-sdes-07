import { type UserModel } from '@/domain/models'

export type CreateUserInput = Pick<UserModel, 'email' | 'password' | 'type'>
export type CreateUserOutput = UserModel

export interface CreateUser {
  create: (data: CreateUserInput) => Promise<CreateUserOutput>
}
