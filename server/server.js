//This makes the same thing than https library
const express = require('express')
const bodyParser = require('body-parser')
//With bodyparser I can read the body from a request

require('./config/config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//This '/' is the adress to make a request
app.get('/user', function (req, res) {
    res.json('Getting an user specified')
})


app.put('/user/:id', (req, res) => {

    let id = req.params.id
    res.json({
        id //Not necessary add a value this is automatically added
    })
})

app.post('/user/', (req, res) => {

    let body = req.body

    let name = body.name
    let erroCode = 400

    //In postman x-wwwform=rlendocded

    if (name === undefined) {

        res.status(erroCode).json(
            {
                err: 400,
                msg: 'We need a name to make insertion'
            }
        )
    } else {
        res.json({
            body
        })
    }
})


app.listen(process.env.PORT,() => {
    console.log('Listen at port :', process.env.PORT);
})
