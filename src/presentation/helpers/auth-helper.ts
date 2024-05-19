import * as jwt from 'jsonwebtoken'
import env from '../../main/config/env'

export const signToken = (id: string, email: string): string => {
  return jwt.sign({
    id,
    email
  },
  String(env.jwtPrivateKey),
  {
    expiresIn: String(env.jwtExpirationTimeInDays)
  })
}

export const validateToken = (accessToken: string): jwt.JwtPayload => {
  if (!accessToken) {
    throw new Error('Missing access token')
  }
  return jwt.verify(accessToken, String(env.jwtPrivateKey)) as jwt.JwtPayload
}
