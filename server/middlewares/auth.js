const jwt = require('jsonwebtoken')


let verifyToken = (req, res, next) => {


    const token = req.get('token') //Get the header request


    //Use res if the token is not valid

    //Error store the msg from jwt
    //decoded is the data decoded from token
    jwt.verify(token, process.env.SEED, (err, _decoded) => {

        if (err) return res.status(401).json({
            summary: 'Invalid token',
            err
        })
        next()
    })

}

module.exports = { verifyToken }