import type { Router, Request, Response } from 'express'

export default (router: Router): void => {
  router.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Health check OK' })
  })
}
