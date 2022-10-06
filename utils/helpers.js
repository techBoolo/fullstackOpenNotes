import bcrypt from 'bcrypt'
import config from '../config/config.js'
import ErrorResponse from './errorResponse.js'

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
