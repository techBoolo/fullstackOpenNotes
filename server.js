import http from 'http'
import app from './app.js'
import * as config from './config/config.js'
import connectDB from './config/db.js'

const PORT = config.PORT || 3001

const server = http.createServer(app)

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
