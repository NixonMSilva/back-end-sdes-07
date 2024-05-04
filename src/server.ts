import express, { Request, Response } from 'express'

// Create an Express application
const app = express()
const port = 3333

// Define a health check endpoint
app.get('/health', (req: Request, res: Response) => {
  // Return a simple JSON response indicating that the server is healthy
  res.json({ status: 'ok' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
