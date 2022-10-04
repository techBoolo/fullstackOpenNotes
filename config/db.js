import { MongoClient } from 'mongodb'
import * as config from './config.js'

const url = config.MONGODB_URI
let db;
const mongoClient = new MongoClient(url)

export const connectDB = async () => {
  try {
    await mongoClient.connect()
    db = mongoClient.db(config.DB_NAME)
    console.log('connected to db')

    process.on('exit', async () => {
      await closeDB()
    })
  }catch(error) {
    throw error
  }
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
