const express = require('express')
const app = express()


//The same instance
app.use(require('./login'))//GET,PUT,ETC
app.use(require('./user'))//GET,PUT,ETC


module.exports = app

