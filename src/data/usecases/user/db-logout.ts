import { type LogoutRepository } from '../../protocols'
import { type Logout } from '../../../domain/usecases'

export class DbLogout implements Logout {
  constructor (private readonly logoutRepository: LogoutRepository) {}

  async logout (userId: number): Promise<void> {
    await this.logoutRepository.logout(userId)
  }
}
