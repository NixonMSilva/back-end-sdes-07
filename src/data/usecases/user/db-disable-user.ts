import { type DisableUserRepository } from '../../protocols'
import { type DisableUser } from '../../../domain/usecases'

export class DbDisableUser implements DisableUser {
  constructor (private readonly disableUserRepository: DisableUserRepository) {}

  async disable (userId: number): Promise<boolean> {
    return await this.disableUserRepository.disable(userId)
  }
}
