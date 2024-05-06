import type { GetUserOutput } from '@/domain/usecases'

export type GetUserByIdRepositoryOutput = GetUserOutput

export interface GetUserByIdRepository {
  getById: (userId: number) => Promise<GetUserByIdRepositoryOutput>
}
