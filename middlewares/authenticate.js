import {
  getTokenFromReq,
  verifyJWToken
} from '../utils/helpers.js'
import { getUser } from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'

const authenticate = async (req, res, next) => {
  const token = await getTokenFromReq(req)
  const decodedToken = await verifyJWToken(token)

  // just incase the user is deleted
  const user = await getUser(decodedToken._id)
  if(user) {
    req.userData = {
      _id: user._id,
      username: user.username
    }
    next()
  } else {
    throw new ErrorResponse(403, 'user has been removed')
  }
}

export default authenticate
