import request from 'supertest'
import app from '@/main/config/app'

describe('Content Type Middleware', () => {
  test('Should return default contet type as json', async () => {
    app.get('/test_content_type', (request, response) => {
      response.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (request, response) => {
      response.type('xml')
      response.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
