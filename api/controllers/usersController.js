import { User,edit,get } from '../model/User.js';
import autoCatch from '../lib/autoCatch.js';
import AppError from './../errorUtilities/AppError.js';

async function getUser(req,res,next){
    const { sub } = req.user;
    const user = await get(sub)
    if (!user) next(new AppError("No user found with that id", 404));

    res.status(200).json({ status: "success", data: user});
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

async function patchUser(req,res,next){
    const { sub } = req.user;
    const user = await edit(sub,req.body)
    res.status(200).json({
        status: 'success',
        data: user
    })
}

//TODO add autocatch
export default autoCatch({
    getUser,
    createUser,
    patchUser
});
