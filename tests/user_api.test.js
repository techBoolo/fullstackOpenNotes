import supertest from 'supertest'
import app from '../app.js'
import { connectDB, closeDB, getDB } from  '../config/db.js'
import helper from './test_helper.js'
import { hashPassword } from '../utils/helpers.js'

const api = supertest(app)
let User
beforeAll(async () => {
  await connectDB()
  User = getDB().collection('users')
})

beforeEach(async () => {
  await User.deleteMany({})
  const hashedPassword = await hashPassword('sekret')
  const user = {
    username: 'root',
    name: 'super_user',
    password: hashedPassword
  }
  await User.insertMany([user])
})

describe('creating a new user', () => {
  test('succeed with a new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser =  {
      username: 'new user',
      name: 'new user',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(r => r.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fail if user with same username exists', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'any name',
      password: 'pass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)

    expect(result.body.message).toContain('username already taken')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await closeDB()
})
