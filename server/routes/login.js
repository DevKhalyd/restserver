//JWT
//Docs: https://expressjs.com/ 
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/User')

const erroCode = 400

//Second param is the middleware that validate the data
app.post('/login', async (req, res) => {

    let body = req.body

    let email = body.email
    let password = body.password

    User.findOne({ email: email }, (err, user) => {

        //problems with the server
        if (err) return res.status(501).json(
            {
                err: 501,
                err
            }
        )

        if (!user) return res.status(404).json({
            err: 'User not found'
        })

        //Desencoded the password
        if (!bcrypt.compareSync(password, user.password)) return res.status(erroCode).json({
            err: erroCode,
            msg: 'Password is incorrect',
            passSent: password
        })

        //This allow create a token to use in the frontend. Contains any data required 
        let token = jwt.sign({
            //Saved as user
            data: user //Expires on 30 days
        }, process.env.SEED, { expiresIn: process.env.LIMIT_TOKEN_TIME })

        return res.json({
            status: 200,
            user,
            token: token
        })
    })


})


module.exports = app

