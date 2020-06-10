
//TODO: Make a README when this projects is finished
//This makes the same thing than https library
require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//With bodyparser I can read the body from a request
const app = express()

let database = 'todoapp' //Database name
let port = '27017' //Port



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//setup config...
app.use(require('./routes/index.js'))//GET,PUT,ETC


//Last version not allow this
/*mongoose.connect(`mongodb://localhost:${port}/${database}`, (err, res) => {

if (err)  throw new Error(`Logs: ${err}`)

console.log(`Connection established \n ${res}`)

})*/

 mongoose.connect(`mongodb://localhost:${port}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(process.env.PORT, () => {
    console.log('Listen at port :', process.env.PORT);
})


