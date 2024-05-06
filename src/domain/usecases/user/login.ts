import { type UserModel } from '../../models'

export type LoginOutput = Omit<UserModel, 'password'> | null

export interface Login {
  login: (email: string, password: string) => Promise<LoginOutput>
}
