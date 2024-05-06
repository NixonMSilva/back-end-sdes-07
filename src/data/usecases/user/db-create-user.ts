import type { CreateUserRepository, CreateUserRepositoryInput, CreateUserRepositoryOutput } from '../../protocols'
import { type CreateUser } from '../../../domain/usecases'

export class DbCreateUser implements CreateUser {
  constructor (private readonly createUserRepository: CreateUserRepository) {}

  async create (data: CreateUserRepositoryInput): Promise<CreateUserRepositoryOutput> {
    return await this.createUserRepository.create(data)
  }
}
