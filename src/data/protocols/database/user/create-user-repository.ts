import type { CreateUserInput, CreateUserOutput } from '../../../../domain/usecases'

export type CreateUserRepositoryInput = CreateUserInput
export type CreateUserRepositoryOutput = CreateUserOutput

export interface CreateUserRepository {
  create: (data: CreateUserRepositoryInput) => Promise<CreateUserRepositoryOutput>
}
