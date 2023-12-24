import User from "../Models/User.js"
import createError from "http-errors"

export const CreateUserService=async (username,email,password,role,)=>{
        const result = await User.create({username,email,password,role})
        return result
}

export const getUserByEmail=async(Email)=>{
        const result = await User.findOne({where:{
                email:Email
        }})
        return result

}

export const getUserById=async(Id)=>{
        const result = await User.findByPk(Id)
        return result
}