import path from 'path'
import { type Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()

  app.use('', router)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
