import { type UserModel } from '../../models'

export type GetUserOutput = Omit<UserModel, 'password'> | null

export interface GetUserById {
  getById: (userId: number) => Promise<GetUserOutput>
}
