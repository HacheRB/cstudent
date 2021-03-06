process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require("helmet");
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// MONGOOSE
mongoose.connect(process.env.MONGO_URL,
  {
    dbName: process.env.MONGO_DB || 'test',
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, err => {
    if (err) { throw new Error(err) }
    console.info('💾 Connected to Mongo Database \n')
  })

// ADDING MIDDLEWARES & ROUTER
const app = express()
  .use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'],
      styleSrc: ["'self'", 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css']
    }
  }))
  .use(cors())
  .use(morgan('combined'))
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api', require('./api/routes'))

// INIT SERVER
const PORT = process.env.PORT || 2222
app.listen(PORT, (err) => {
  if (err) { throw new Error(err) }
  console.info('>'.repeat(40))
  console.info('💻  Reboot Server Live')
  console.info(`📡  PORT: http://localhost:${PORT}`)
  console.info('>'.repeat(40) + '\n')
})
