const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//According to docs
//https://www.npmjs.com/package/mongoose
const User = new Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required']
    },
    isLoged: {
        type: Boolean,
        default: false
    },
    isOnGoogle: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        default: 'NoImage'
    }
});

//Get the method JSON in other words override the JSON method
User.methods.toJSON = function () {

    //Getting the istance
    let user = this
    //Getting toObject METHOD
    let userObject = user.toObject()

    //Deleting the atribute password for not show.
    delete userObject.password

    return userObject;
}



//If we need to understand this. So we can read the docs

module.exports = mongoose.model('User', User)