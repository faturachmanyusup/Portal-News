require('dotenv').config()
const express = require('express')
const app = express()
const port = 5500
const routes = require('./routes');
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => console.log(`This app listening at ${port}`))
