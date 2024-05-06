import { type UserModel } from '@/domain/models'

export type LoginOutput = Omit<UserModel, 'password'> | null

export interface Login {
  login: (email: string, password: string) => Promise<LoginOutput>
}
