import { getDB } from '../config/db.js'

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  }
]

const notesInDb = async () => {
  const Note = getDB().collection('notes')
  const cursor = await Note.find()
  return await cursor.toArray()
}

const usersInDb = async () => {
  const User = getDB().collection('users')
  const cursor = await User.find()
  const users = await cursor.toArray()
  return users
}

const helper = {
  initialNotes,
  notesInDb,
  usersInDb,
}

export default helper
