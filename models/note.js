import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export const getNotes = async () => {
  try {
    const Note = getDB().collection('notes')
    const cursor = await Note.find()
    return await cursor.toArray()
  }catch(error) {
    throw error
  }
}

export const getNote = async (id) => {
  try {
    const Note = getDB().collection('notes')
    const note = await Note.findOne({_id: ObjectId(id)})
    return note
  }catch(error) {
    throw error
  }
}

export const deleteNote = async (id) => {
  try {
    const Note = getDB().collection('notes')
    return await Note.deleteOne({ _id: ObjectId(id) })
  }catch(error) {
    throw error
  }
}

export const updateNote = async (id, note) => {
  try {
    const Note = getDB().collection('notes')
    const updatedNote = await Note.findOneAndUpdate(
      {_id: ObjectId(id)}, 
      { $set: note },
      { returnDocument: 'after' }
    )
    return updatedNote.value
  }catch(error) {
    throw error
  }
}

export const createNote = async (note) => {
  try {
    const Note = getDB().collection('notes')
    const response = await Note.insertOne(note)
    const newNote = await Note.findOne({ _id: response.insertedId })
    return newNote
  }catch(error) {
    throw error
  }
}
