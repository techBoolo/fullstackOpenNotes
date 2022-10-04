import * as Note from '../models/note.js'
import ErrorResponse from '../utils/errorResponse.js'

export const index = async (req, res, next) => {
  try {
    const notes = await Note.getNotes()
    res.status(200).json(notes)
  }catch(error) {
    next(error)
  }
}

export const show = async (req, res, next) => {
  try {
    const { id } = req.params
    const note = await Note.getNote(id)
    if(note) {
      res.status(200).json(note)
    } else {
      throw new ErrorResponse(404, 'Note, not found')
    }
  }catch(error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Note.deleteNote(id)
    if(result.deletedCount > 0) {
      res.status(200).json({ message: 'note deleted', ...result })
    } else {
      throw new ErrorResponse(404, 'note not found')
    }
  }catch(error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params
    const note = await Note.updateNote(id, data)
    if(note) {
      res.status(200).json(note)
    } else {
      throw new ErrorResponse(404, 'note not found')
    }
  }catch(error){
    next(error)
  }
}

export const create = async (req, res, next) => {
  const { content, important }  = req.body

  try {
    if(content.trim()) {
      const note = {
        content,
        important: important || false,
        date: new Date().toISOString()
      }
      const newNote = await Note.createNote(note)
      res.status(201).json(newNote)
    } else {
      throw new ErrorResponse(400, 'Content must be specified')
    }
  }catch(error) {
    next(error)
  }
}
