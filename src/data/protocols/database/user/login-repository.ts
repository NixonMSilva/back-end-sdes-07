import type { LoginOutput } from '../../../../domain/usecases'

export type LoginRepositoryOutput = LoginOutput

export interface LoginRepository {
  login: (email: string, password: string) => Promise<LoginRepositoryOutput>
}
