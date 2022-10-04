import express from 'express'
import ErrorResponse from './utils/errorResponse.js'
import notesRoute from './routes/note.js'
import logger from './utils/logger.js'

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  req.requestTime = Date.now()
  next()
})
app.use((req, res, next) => {
  logger.info(req.method, req.path, req.requestTime)
  next()
})
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'it works' })
})

app.use('/api/notes', notesRoute)

// middlewares
app.use((req, res, next) => {
  const error = new ErrorResponse(404, "Route not found")
  next(error)
})

app.use((error, req, res, next) => {
  res.statusMessage = error.message
  res.status(error.statusCode || 500)
  res.json({ message: error.message })
})
export default app
