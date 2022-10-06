import { MongoClient } from 'mongodb'
import config from './config.js'
import logger from '../utils/logger.js'

const url = config.NODE_ENV === 'test'
  ? config.TEST_MONGODB_URI
  : config.MONGODB_URI

const DB_NAME = config.NODE_ENV === 'test'
  ? config.TEST_DB_NAME
  : config.DB_NAME

let db

const mongoClient = new MongoClient(url)

export const connectDB = async () => {
  await mongoClient.connect()
  db = mongoClient.db(DB_NAME)
  logger.info('connected to db')

  process.on('exit', async () => {
    await closeDB()
  })
}

export const getDB = () => {
  return db
}

export const closeDB = async () => {
  if(mongoClient) {
    await mongoClient.close()
  }
}

export default connectDB
