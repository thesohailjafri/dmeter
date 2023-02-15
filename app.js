require('dotenv/config')
require('express-async-errors')

// npm imports
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const express = require('express')
const morgan = require('morgan')

// local imports
const connectDB = require('./helpers/db/connect')
const routes = require('./routes/index')

const app = express()
const port = process.env.PORT || 5000

// npm middleware
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())

routes(app)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening port ${port}...`))
  } catch (error) {
    console.error(error)
  }
}
start()
