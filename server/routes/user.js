//Docs: https://expressjs.com/ 
const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const _ = require('underscore')
const saltRounds = 10



//Models (Schema)
const User = require('../models/User')

//This '/user' is the adress to make a request
app.get('/user', function (req, res) {


    let limit = req.query.limit || 0
    limit = Number(limit)

    let skip = req.query.skip || 0
    skip = Number(skip)




    User.find({})//Conditions...
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                //Maybe there is not users or the request is bad (404)
                return res.status(404).json({
                    msg: err,
                })
            }

            User.count({}, (err, count) => {

                if (err) {
                    //Maybe there is not users or the request is bad (404)
                    return res.status(404).json({
                        msg: err,
                    })
                }
                return res.json({
                    count,
                    users,
                })

            })




        })



})


//Update a  user. When use ':' means that url expects a param (Read the docs to more info)
app.put('/user/:id', (req, res) => {

    const keysAvaibles = [
        'name',
        'img',
    ]


    let id = req.params.id
    //Pick fuuntion returns a object with filtered data
    let body = _.pick(req.body, keysAvaibles)


    //Allows to return a new document
    const options = {
        new: true
    }


    User.findByIdAndUpdate(id, body, options, (err, user) => {

        if (err) {
            return res.status(404).json({
                msg: err.message,
            })
        }

        //When just returns the res.json that means that return a 200 ok response
        return res.json({
            user
        })

    })





})

//Set a new schema inside the db
app.post('/user/', (req, res) => {

    let body = req.body

    let erroCode = 400

    //Model
    let user = new User({
        name: body.name,
        password: bcrypt.hashSync(body.password, saltRounds),
        email: body.email
    })

    if (body.name === undefined || body.email === undefined) return res.status(erroCode).json({
        err: 404,
        msg: 'Data is missing'
    })


    //Save means insert into the datbase
    //UserObject means a insertion OK
    user.save((err, userObject) => {

        //This should return an error 500 because the error is in the server...
        if (err) return res.status(erroCode).json(
            {
                err: 500,
                msg: 'Something is wrong with the server',
                errServer: err
            }
        )

        return res.json(
            {
                status: 200,
                user: userObject,
            }

        )
    })
    //In postman x-wwwform=rlendocded
})


app.delete('/user/:id', (req, res) => {


    let id = req.params.id
    

    User.findByIdAndRemove(id, (err, userRemoved) => {
        if (err) return res.status(erroCode).json({
            err
        })
        if (!userRemoved) return res.status(erroCode).json({
            err: {
                msg: 'User not found.'
            }
        })
        return res.json({
            userRemoved
        })
    })

})


module.exports = app