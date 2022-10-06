import { getDB } from '../config/db.js'
import { ObjectId } from 'mongodb'

export const getUsers = async () => {
  const User = getDB().collection('users')
  const cursor = await User.find()
  return await cursor.toArray()
}

export const getUser = async (id) => {
  const User = getDB().collection('users')
  const user = await User.findOne({ _id: ObjectId(id) })
  return user
}

export const getUserByUsername = async (username) => {
  const User = getDB().collection('users')
  const user = await User.findOne({ username })
  return user
}

export const createUser = async (userData) => {
  const User = getDB().collection('users')
  const response = await User.insertOne(userData)
  return response
}
