import { type Controller, type HttpRequest } from '@/presentation/protocols'
// import { timeout } from '../utils'

import { type RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptRoute: Adapter = controller => async (req, res) => {
  try {
    const request: HttpRequest = {
      query: req.query,
      body: req.body,
      params: req.params,
      file: req.file
    }

    console.log(request)
    request.headers = req.headers
    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      res.status(httpResponse.statusCode).json({ data: httpResponse.body })
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
