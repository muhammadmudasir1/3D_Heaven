import { Router } from "express";
import { createUser,login,deleteUser, generateTokens } from "../controller/userController.js";
import varifyToken from "../middleware/verifyToken.js"


const userRouter=Router()

userRouter.post('/create',createUser)
userRouter.post('/login',login)
userRouter.delete('/',deleteUser)
userRouter.get('/refresh',generateTokens)
userRouter.get('/test',varifyToken, (req,res,next)=>{
    
    console.log("token is varified")
    console.log(req.username)
    console.log(req.userId)
    res.send("Token is varified")
})

export default userRouter