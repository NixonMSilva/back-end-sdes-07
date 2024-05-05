import type { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}
