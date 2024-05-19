import { type UserModel } from '../../models'

export type LoginOutput = UserModel | null

export interface Login {
  login: (email: string, password: string) => Promise<LoginOutput>
}
