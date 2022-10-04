import { MongoClient } from 'mongodb'
import * as config from './config.js'
import logger from '../utils/logger.js'

const url = config.MONGODB_URI
let db
const mongoClient = new MongoClient(url)

export const connectDB = async () => {
  await mongoClient.connect()
  db = mongoClient.db(config.DB_NAME)
  logger.info('connected to db')

  process.on('exit', async () => {
    await closeDB()
  })
}

export const getDB = () => {
  return db
}

const closeDB = async () => {
  if(mongoClient) {
    await mongoClient.close()
  }
}

export default connectDB
