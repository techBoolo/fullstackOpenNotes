import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export const getNotes = async () => {
  const Note = getDB().collection('notes')
  const cursor = await Note.find()
  return await cursor.toArray()
}

export const getNote = async (id) => {
  const Note = getDB().collection('notes')
  const note = await Note.findOne({ _id: ObjectId(id) })
  return note
}

export const deleteNote = async (id) => {
  const Note = getDB().collection('notes')
  return await Note.deleteOne({ _id: ObjectId(id) })
}

export const updateNote = async (id, note) => {
  const Note = getDB().collection('notes')
  const updatedNote = await Note.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: note },
    { returnDocument: 'after' }
  )
  return updatedNote.value
}

export const createNote = async (note) => {
  const Note = getDB().collection('notes')
  const response = await Note.insertOne(note)
  const newNote = await Note.findOne({ _id: response.insertedId })
  return newNote
}
