import type { LoginRepository, LoginRepositoryOutput } from '@/data/protocols'
import { type Login } from '@/domain/usecases'

export class DbLogin implements Login {
  constructor (private readonly loginRepository: LoginRepository) {}

  async login (email: string, password: string): Promise<LoginRepositoryOutput> {
    return await this.loginRepository.login(email, password)
  }
}
