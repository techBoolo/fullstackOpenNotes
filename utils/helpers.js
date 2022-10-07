import bcrypt from 'bcrypt'
import config from '../config/config.js'
import ErrorResponse from './errorResponse.js'
import * as User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const verifyFields = (data) => {
  const { username, name, password } = data
  if(username && name && password) {
    return true
  }else {
    throw new ErrorResponse(400, 'Please provide the required fields')
  }
}

export const hashPassword = async (password) => {
  const salt = config.saltRounds
  return await bcrypt.hash(password, salt)
}

export const isUserExist = async (username) => {
  return await User.getUserByUsername(username)
}

export const comparePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password)
}

export const generateJWToken = async (payload) => {
  return await jwt.sign(
    payload,
    config.JWT_KEY,
    { expiresIn: '7 days' }
  )
}

export const getTokenFromReq = (req) => {
  const authentication = req.get('authentication')
  if(authentication && authentication.toLowerCase().startsWith('bearer')) {
    return authentication.split(/\s+/)[1]
  } else {
    throw new ErrorResponse(400, 'Please provide your credential')
  }
}

export const verifyJWToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, config.JWT_KEY)
    if(decodedToken) {
      return decodedToken
    } else {
      throw new ErrorResponse(403, 'wrong credential')
    }
  }catch(error) {
    throw new ErrorResponse(403, 'wrong credential')
  }
}
