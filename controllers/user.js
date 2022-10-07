import * as User from '../models/user.js'
import {
  verifyFields,
  hashPassword,
  comparePassword,
  isUserExist,
  generateJWToken
} from  '../utils/helpers.js'
import ErrorResponse from '../utils/errorResponse.js'

export const index = async (req, res) => {
  const users = await User.getUsers()
  res.status(200).json(users)
}

export const create = async (req, res) => {
  verifyFields(req.body)
  const { username, name, password } = req.body
  if(await isUserExist(username)){
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

export const login = async (req, res) => {
  const { username, password } = req.body
  const user = await isUserExist(username)
  if(user && await comparePassword(user, password)) {
    const payload = {
      _id: user._id,
      username: user.username
    }

    const token = await generateJWToken(payload)
    res.status(200).json({
      message: 'logged in success',
      user: { token, ...payload, name: user.name }
    })
  } else {
    throw new ErrorResponse(401, 'Authentication error')
  }
}
