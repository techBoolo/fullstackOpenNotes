import * as Note from '../models/note.js'
import * as User from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'

export const index = async (req, res) => {
  const notes = await Note.getNotes()
  res.status(200).json(notes)
}

export const show = async (req, res) => {
  const { id } = req.params
  const note = await Note.getNote(id)
  if(note) {
    res.status(200).json(note)
  } else {
    throw new ErrorResponse(404, 'Note, not found')
  }
}

export const remove = async (req, res) => {
  const { id } = req.params
  const result = await Note.deleteNote(id)
  if(result.deletedCount > 0) {
    res.status(200).json({ message: 'note deleted', ...result })
  } else {
    throw new ErrorResponse(404, 'note not found')
  }
}

export const update = async (req, res) => {
  const data = req.body
  const { id } = req.params
  const note = await Note.updateNote(id, data)
  if(note) {
    res.status(200).json(note)
  } else {
    throw new ErrorResponse(404, 'note not found')
  }
}

export const create = async (req, res) => {
  const currentUser = req.userData

  const { content, important }  = req.body

  if(content && content.trim()) {  // if we didn't pass content, we have to check that
    const note = {
      content,
      important: important || false,
      date: new Date().toISOString(),
      user: currentUser._id
    }
    const newNote = await Note.createNote(note)
    await User.addNoteToUser(currentUser._id, newNote._id)

    res.status(201).json(newNote)
  } else {
    throw new ErrorResponse(400, 'Content must be specified')
  }
}
