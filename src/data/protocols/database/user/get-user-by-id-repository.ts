import type { GetUserOutput } from '@/domain/usecases'

export type GetUserByIdRepositoryOutput = GetUserOutput

export interface GetUserByIdRepository {
  login: (userId: number) => Promise<GetUserByIdRepositoryOutput>
}
