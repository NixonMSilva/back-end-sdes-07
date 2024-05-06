import { type UserModel } from '@/domain/models'

export type LoginOutput = UserModel
export interface Login {
  login: (email: string, password: string) => Promise<LoginOutput>
}
