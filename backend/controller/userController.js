import { AccessTokenGenerator ,RefreshTokenGenerator} from "../helper/JWTGenerator.js"
import { getUserById, getUserByEmail,CreateUserService, updateUser,getAllUsers,removeUser} from "../services/User_Service.js"
import CreateError from "http-errors"
import {validate} from "email-validator"
import bcrypt from 'bcrypt'
import redisClient from "../helper/init_redis.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

export const createUser=async(req,res,next)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    try {
        const username=req.body.username
        const email=req.body.email
        let password=req.body.password
        const role=req.body.role
        
        if(!validate(email)){
            throw CreateError.BadRequest("Invalid Email Address")
        }
        
        if(!passwordRegex.test(password)){
            throw CreateError.BadRequest("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.")
        }
        password=await bcrypt.hash(password,10)



        const result=await CreateUserService(username,email,password,role)
        res.send(result)
        
    } catch (error) {
        console.log(error)
        next(CreateError.BadRequest(error.errors[0].message))
    }
}

export const login=async (req,res,next)=>{
    try {
        const {email,password}=req.body
        const user=await getUserByEmail(email)
        if(!user){
            throw CreateError.BadRequest("Invalid Email Address")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw CreateError.BadRequest("Invalid Password")
        }

        const refreshToken = await RefreshTokenGenerator(user.id,user.username)
        const accessToken = await AccessTokenGenerator(user.id,user.username)
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            expires: new Date(Date.now()+2591990000)
        })

        res.send({"userId":user.id,"username":user.username,"accessToken":accessToken,"role":user.role})

    } catch (error) {
        console.log(error)
        next(error)
    }
    
}


export const generateTokens= async (req,res,next)=>{
    try {
        const {refreshToken}=req.cookies
        const payload=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRATE)
        if(!payload){
            throw CreateError("Token is not valid") 
        }
        const isVarified=await redisClient.get(payload.userId)
        if(!isVarified){
            throw CreateError("Token is not valid") 
        }
        const user=await getUserById(payload.userId)

        const newRefresh = await RefreshTokenGenerator(user.id,user.username)
        const accessToken = await AccessTokenGenerator(user.id,user.username)
        res.cookie("refreshToken",newRefresh,{
            httpOnly:true,
            expires: new Date(Date.now()+2591990000)
        })

        res.send({
            "accessToken":accessToken,
            "role":user.role,
            "userId":user.id,
            "username":user.username
        })

        
        
    } catch (error) {
        console.log("from GenerateTokens "+error )
        next(CreateError.Forbidden("Invalid Request"))
    }
}

export const logout=(req,res,next)=>{
    try {
        const {refreshToken}=req.cookies
        const {userId}=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRATE)
        redisClient.del(userId)
        res.send("User is Logout")
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const ChangePassword=async (req,res,next)=>{
    console.log(req.body.password)
    try {
        // console.log(req.body.password)
        const user= await getUserById(req.userId)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isMatch=await bcrypt.compare(req.body.password,user.password)
        console.log(isMatch)
        if(isMatch){
            let newPassword=req.body.newPassword
            if(!passwordRegex.test(newPassword)){
                throw CreateError.BadRequest("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.")
            }
            console.log(newPassword)
            const password=await bcrypt.hash(newPassword,10)

            await updateUser(user.id,{password})
            res.send (

                {"msg":"Password is Changed"}
            )
        }
        else{
            throw CreateError.BadRequest("Invalid Password")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const allUsers=async(req,res,next)=>{
    try {
        const result=await getAllUsers()
        res.send(result)
    } catch (error) {
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    try {
        const userId=req.params.userId
        const result=await removeUser(userId)
        redisClient.del(userId)
        res.send("User is Deleted")
    } catch (error) {
        next(error)
    }
}