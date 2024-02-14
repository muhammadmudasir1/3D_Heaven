import {getUserById} from '../services/User_Service.js'
import createError from 'http-errors'

export const adminAccess= async(req,res,next)=>{
    try {
        const user=await getUserById(req.userId)
        if(user.role<=2){
            next()
        }
        else{
            next(createError.Unauthorized("You Don't an Admin Access"))
        }
    } catch (error) {
        next(error)
        console.log(error)
    }
}

export const superUserAccess= async(req,res,next)=>{
    try {
        const user=await getUserById(req.userId)
        if(user.role===1){
            next()
        }
        else{
            next(createError.Unauthorized("You Don't Authority"))
        }
    } catch (error) {
        next(error)
        console.log(error)
    }
}


export const EditorAccess= async(req,res,next)=>{
    try {
        const user=await getUserById(req.userId)
        if(user.role<=3){
            next()
        }
        else{
            next(createError.Unauthorized("You Don't have an Editor Access"))
        }
    } catch (error) {
        next(error)
        console.log(error)
    }
}