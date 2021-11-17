const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        sub: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
                validator: [validator.isEmail,'must be a valid email']
        }

})

let User = mongoose.model('User',userSchema)


