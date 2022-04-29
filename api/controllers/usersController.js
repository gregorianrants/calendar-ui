const {User} = require("./../model/user");
const autoCatch = require("../lib/autoCatch");
const AppError = require("./../errorUtilities/AppError");


async function getUser(req,res,next){
    const { sub } = req.user;
    console.log('8',req.user)
    const user = await User.findById(sub)
    if (!user) {
        const error = new AppError("No user found with that id", 404);
        return next(error);
    }
    const {authorizedToGcal} = user
    res.status(200).json({ status: "success", data: {
        authorizedToGcal
        }});
}

async function createUser(req,res,next){
    const { sub } = req.user;
    console.log('18',sub)
    const user = await User.create({_id: sub})
    const {authorizedToGcal} = user
    res.status(200).json({status: 'success',data:{
        authorizedToGcal
        }})
}

module.exports = autoCatch('usersController')({
    getUser,
    createUser
});
