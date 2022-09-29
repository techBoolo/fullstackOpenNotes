import express from 'express'
import crypto from 'crypto'
import { notesData } from './data.js' 
import ErrorResponse from './utils/errorResponse.js'

const app = express()
let notes = [...notesData];

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.path, '---')
  next()
})
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'it works'})
})

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const note = notes.find(note => note.id === id)
  if(note) {
    res.status(200).json(note)
  } else {
    const error = new ErrorResponse(404, 'Note not found')
    next(error)
  }
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== id)

  res.status(200).json({ message: 'note deleted' })
})

app.post('/api/notes', (req, res, next) => {
  const { content, important }  = req.body 

  if(content.trim()) {
    const note = {
      id: crypto.randomUUID(),
      content, 
      important: important || false,
      date: new Date().toISOString()
    }
    notes = [ ...notes, note ]
    res.status(201).json(note)
  } else {
    const error = new ErrorResponse(400, 'Content must be specified')
    next(error)
  }
})

app.put('/api/notes/:id', (req, res, next) => {
  const data = req.body
  const { id } = req.params
  notes = notes.map(note => note.id === id ? data : note)
  res.status(200).json(data)
})

// middlewares
app.use((req, res, next) => {
  const error = new ErrorResponse(404, "Route not found")
  next(error)
})

app.use((error, req, res, next) => {
  res.statusMessage = error.message
  res.status(error.statusCode || 500)
  res.json({ message: error.message})
})
export default app
