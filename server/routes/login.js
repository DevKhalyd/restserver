//JWT
//Docs: https://expressjs.com/ 
const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const User = require('../models/User')

const erroCode = 400

app.post('/login', async (req, res) => {


    let body = req.body

    let email = body.email
    let password = body.password

    User.findOne({ email: email }, (err, user) => {
        
        //problems with the server
        if (err) return res.status(501).json(
            {
                err: 503,
                err
            }
        )

        if (!user) return res.status(404).json({
            err:'User not found'
        })

        //Desencoded the password
        if (!bcrypt.compareSync(password,user.password)) return res.status(erroCode).json({
            err : erroCode,
            msg: 'Password is incorrect',
            passSent: password
        })
    })


    return res.json({
        status: 200,
        user,
        token: 'asdasdysagdjsadgasdasdhg'
    })


})


module.exports = app

