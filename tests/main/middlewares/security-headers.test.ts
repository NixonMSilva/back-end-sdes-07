import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('Should set referrer-policy header', async () => {
    app.get('/referrer-policy', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/referrer-policy')
      .expect('referrer-policy', 'no-referrer-when-downgrade')
  })

  test('Should set strict-transport-security header', async () => {
    app.get('/strict-transport-security', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/strict-transport-security')
      .expect('strict-transport-security', 'max-age=15768000; includeSubDomains')
  })

  test('Should set x-frame-options header', async () => {
    app.get('/x-frame-options', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/x-frame-options')
      .expect('x-frame-options', 'SAMEORIGIN')
  })
})
