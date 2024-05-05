import { type Controller, type HttpRequest } from '@/presentation/protocols'
import { timeout } from '@/main/utils'

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
    const httpResponse = await timeout(30, controller.handle(request))

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      res.status(httpResponse.statusCode as number).json({ data: httpResponse.body })
    } else {
      res.status(httpResponse.statusCode as number).json({
        error: httpResponse.body.message
      })
    }
  } catch (error) {
    if (error.message === 'Request Timeout') {
      res.status(503).json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}
