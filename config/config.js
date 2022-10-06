import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
const DB_NAME =  process.env.DB_NAME
const TEST_DB_NAME =  process.env.TEST_DB_NAME
const NODE_ENV = process.env.NODE_ENV
const saltRounds = +process.env.saltRounds

const config = {
  PORT,
  MONGODB_URI,
  TEST_MONGODB_URI,
  DB_NAME,
  TEST_DB_NAME,
  NODE_ENV,
  saltRounds
}

export default config
