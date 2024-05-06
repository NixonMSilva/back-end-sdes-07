import { type UserModel } from '@/domain/models'

export type GetUserOutput = UserModel

export interface GetUserById {
  getById: (userId: number) => Promise<GetUserOutput>
}
