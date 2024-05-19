import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT ?? 3333,
  saltRounds: Number(process.env.SALT_ROUNDS) ?? 8,
  jwtPrivateKey: String(process.env.JWT_PRIVATE_KEY) ?? 'DEFAULT_KEY',
  jwtExpirationTimeInDays: process.env.JWT_EXPIRATION_TIME ? String(process.env.JWT_EXPIRATION_TIME) : '90d'
}
