require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mapsRouter = require('./controllers/maps')
const dataRouter = require('./controllers/data')

// middlewares
app.use(cors())
app.use(express.json())

// routers
app.use('/api/maps', mapsRouter)
app.use('/api/data', dataRouter)

module.exports = app