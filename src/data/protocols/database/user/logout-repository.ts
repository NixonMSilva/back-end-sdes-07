export interface LogoutRepository {
  logout: (userId: number) => Promise<void>
}
