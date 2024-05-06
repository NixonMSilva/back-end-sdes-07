import type { GetUserByIdRepository, GetUserByIdRepositoryOutput } from '@/data/protocols'
import { type GetUserById } from '@/domain/usecases'

export class DbGetUserById implements GetUserById {
  constructor (private readonly getUserByIdRepository: GetUserByIdRepository) {}

  async getById (userId: number): Promise<GetUserByIdRepositoryOutput> {
    return await this.getUserByIdRepository.login(userId)
  }
}
