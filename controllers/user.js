import * as User from '../models/user.js'
import { verifyFields, hashPassword } from  '../utils/helpers.js'
import ErrorResponse from '../utils/errorResponse.js'

export const index = async (req, res) => {
  const users = await User.getUsers()
  res.status(200).json(users)
}

export const create = async (req, res) => {
  verifyFields(req.body)
  const { username, name, password } = req.body
  if(await User.getUserByUsername(username)){
    throw new ErrorResponse(409, 'username already taken')
  }
  const hashedPassword = await hashPassword(password)
  const userData = {
    username,
    name,
    password: hashedPassword
  }
  const response = await User.createUser(userData)

  res.status(201).json({ message: 'user created', ...response })
}
