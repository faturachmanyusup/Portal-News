require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const routes = require('./routes');
const cors = require('cors')
const errorHandler = require(`./middlewares/errorHandler`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler)


app.listen(port, () => console.log(`This app listening at ${port}`))
