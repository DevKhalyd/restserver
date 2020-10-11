# Rest Server

An aplication made with Nodejs

## Features

- Requests POST, GET, PUT, DELETE
- Routes
- Database
- Endpoints
- An so on

## Explanation

There are some explanations in the folder 'notes' in the root repository.

### How works the server?

You can make some request to the server with postman calling to localhost:3000

Then you can send some users objects to the server to add,delete,update,edit users in the database

So this document explain some parts of the server.

#### Config

When you upload your server's files to the server you need to config the port

```javascript
process.env.PORT = process.env.PORT || 3000;
```

**3000** means localhost and **process.env.PORT** means the cloud like Heroku in this case

If I need to insert a user into the database I should use the schema based on MongoDB Docs

```javascript
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//According to docs
//https://www.npmjs.com/package/mongoose
const User = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isLoged: {
    type: Boolean,
    default: false,
  },
  isOnGoogle: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: "NoImage",
  },
});
```

**The code above can be found in the repository**

## General Porpuses

For example If you want to create **Endpoints** to call another API

Just you should use the **express** library

Create a route with the type REQUEST

**Example**

```javascript
app.post('/user/', (req, res) => {

        //...
        //Some conditions
  //RESPONSE
  return res.json(
            {
                status: 200,
                user: userObject,
            }
        )
    })
    //In postman x-wwwform=rlendocded to send data though body
})
```

If you want an example with more details check [this](https://github.com/DevKhalydIOS/cisa-server)

## Adding a new enverioment variable to HEROKU

With `heroku config` you can see the avaibles variables

To create a new variables use `heroku config:set NAME-VARIABLE="$VALUEVARIABLE"`

**Read the docs for more information**

## Using middlewares

Middlewares are used to run a part of code before antoher code.

This code runs between the step 1 and the step 3 this serves like a bridge between both parts to know if
the data is valid or not (depends of case)

`middlewares/auth.js`

```javascript
const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  const token = req.get("token"); //Get the header request

  //Use res if the token is not valid

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err)
      return res.status(401).json({
        summary: "Invalid token",
        err,
      });

    console.log("DATA decoded from TOKEN");
    console.log(decoded);
    next();
  });
};

module.exports = {
  verifyToken,
};
```

`file_where_is_used.js`

```javascript
//Get the function
const { verifyToken } = require('../middlewares/auth')

//Using here
app.get('/user', verifyToken, function (req, res) {

```

## Read tokens and check how are structured

Check this page for more information [JWT](https://jwt.io/)

# How can you give style to a md file?

[Please check here](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) :thumbsup:
