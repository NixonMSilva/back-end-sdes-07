import type { Middleware, HttpRequest, HttpResponse } from '@/presentation/protocols'

import type { RequestHandler, NextFunction } from 'express'

type Adapter = (middleware: Middleware) => RequestHandler

export const adaptMiddleware: Adapter = middleware => async (req, res, next: NextFunction) => {
  const request: HttpRequest = {
    headers: req.headers
  }

  const httpResponse: HttpResponse = await middleware.handle(request)

  if (httpResponse?.statusCode === 200) {
    Object.assign(req, httpResponse.body)
    next()
  } else if (httpResponse) {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  } else {
    res.status(500).json({
      error: 'Internal server error'
    })
  }
}
