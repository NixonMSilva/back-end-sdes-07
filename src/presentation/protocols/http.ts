export interface HttpRequest {
  query?: any
  body?: any
  headers?: any
  params?: any
  file?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
