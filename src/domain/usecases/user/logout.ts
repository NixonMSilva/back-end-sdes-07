export interface Logout {
  logout: (userId: number) => Promise<void>
}
