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
    //In postman x-wwwform=rlendocded
})
```

If you want an example with more details check [this](https://github.com/DevKhalydIOS/cisa-server)


# How can you give style to a md file?

[Please check here](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) :thumbsup:
