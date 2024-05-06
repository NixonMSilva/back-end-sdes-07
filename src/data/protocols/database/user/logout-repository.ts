export interface LogoutRepository {
  login: (userId: number) => Promise<void>
}
