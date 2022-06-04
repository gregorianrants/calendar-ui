import { User,edit } from '../model/User.js';
import autoCatch from '../lib/autoCatch.js';
import AppError from './../errorUtilities/AppError.js';
import usersService from "../services/usersService.js";


async function getUser(req,res,next){
    const { sub } = req.user;
    const user = await usersService.getUser(sub)
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
