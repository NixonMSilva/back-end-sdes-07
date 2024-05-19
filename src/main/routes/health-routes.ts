import type { Router, Request, Response } from 'express'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Health check OK' })
  })
  router.get('/health-check-auth', auth, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Health check OK' })
  })
}
