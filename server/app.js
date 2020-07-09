require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const errorHandling = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errorHandling)

app.listen(PORT,()=> console.log('listen on',PORT))
