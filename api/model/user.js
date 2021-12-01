const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
        _id: {
                type: String,
                required: true,
        },
        authorizedToGcal: {type: Boolean, default: false},
        accessToken: String,
        refreshToken: String,
        // email: {
        //         type: String,
        //         required: true,
        //         validator: [validator.isEmail,'must be a valid email']
        // }

})

let User = mongoose.model("User",userSchema)





module.exports = {
        User
}





