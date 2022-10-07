import supertest from 'supertest'
import app from '../app.js'
import { connectDB, closeDB, getDB } from '../config/db.js'
import helper from './test_helper.js'

const api = supertest(app)
let Note
let User
let user

beforeAll(async () => {
  await connectDB()
  Note = getDB().collection('notes')
  User = getDB().collection('users')
})

beforeEach(async () => {
  await Note.deleteMany({})
  await User.deleteMany({})
  await Note.insertMany(helper.initialNotes)
  const newUser = {
    username: 'new root',
    name: 'new root',
    password: 'password'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const result = await api
    .post('/api/users/login')
    .send(newUser)
    .expect(200)

  user = result.body.user
})

describe('when there is initially some notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response =  await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async ()  => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain('HTML is easy')
  })
})

describe('adding of a new note', () => {
  test('succeed with valid note', async () => {

    const newNote = {
      content: 'async/await makes async calls simple',
      important: true
    }

    const result = await api
      .post('/api/notes')
      .set("authentication", `bearer ${user.token}`)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.user).toEqual(user._id)

    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain('async/await makes async calls simple')
  })

  test('will fail with invalid note', async () => {
    const newNote = { important: false }

    const result = await api
      .post('/api/notes')
      .set("authentication", `bearer ${user.token}`)
      .send(newNote)
      .expect(400)

    expect(result.body).toEqual({ message: "Content must be specified" })

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })
})

describe('a note', () => {
  test('can be viewed', async () => {
    const response = await api
      .get('/api/notes')
    const noteToView = response.body[1]
    const resultNote = await api
      .get(`/api/notes/${noteToView._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(noteToView).toEqual(resultNote.body)
  })

  test('can be deleted', async () => {
    const response = await api
      .get('/api/notes')
    const notesAtFirst = response.body
    const noteToDelete = notesAtFirst[0]
    await api
      .delete(`/api/notes/${noteToDelete._id}`)
      .expect(200)
    const notesAtEnd = await api
      .get('/api/notes')
    expect(notesAtEnd.body).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.body.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('trying to access, delete, update if it does note exist return an error', async () => {
    const response = await api
      .get('/api/notes')
    const notesAtFirst = response.body
    const noteToDelete = notesAtFirst[0]
    await api
      .delete(`/api/notes/${noteToDelete._id}`)
      .expect(200)
    await api
      .get(`/api/notes/${noteToDelete._id}`)
      .expect(404)
    await api
      .delete(`/api/notes/${noteToDelete._id}`)
      .expect(404)
    await api
      .put(`/api/notes/${noteToDelete._id}`)
      .send({ important: !noteToDelete.important })
      .expect(404)
  })
})

afterAll(() => {
  closeDB()
})
