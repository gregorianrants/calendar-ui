import mongoose from 'mongoose';
import validator from 'validator';


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

export let User = mongoose.model("User",userSchema)








