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
        email: {
                type: String,
                validator: [validator.isEmail,'must be a valid email']
        },
        emailPassword: {
                type: String
        },
        emailHost: {
          type: String
        },
        companyName: String,
        companyAddress: String,
})

export let User = mongoose.model("User",userSchema)


export async function get(id) {
        const user =  await User.findById(id)
        return user
}

export async function edit(_id, change) {
        const user = await get(_id);
        Object.keys(change).forEach(function (key) {
                user[key] = change[key];
        });
        await user.save();
        return user;
}
















