import {User} from "../model/User.js";
import AppError from "../errorUtilities/AppError.js";


async function getUser(id){
    const user = await User.findById(id)
    if (!user) {
        throw(new AppError("No user found with that id", 404));
    }
    return user
}

export default {
    getUser
}