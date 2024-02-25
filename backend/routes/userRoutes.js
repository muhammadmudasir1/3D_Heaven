import { Router } from "express";
import { createUser,login,logout, generateTokens,ChangePassword, allUsers,deleteUser } from "../controller/userController.js";
import varifyToken from "../middleware/verifyToken.js"
import { superUserAccess } from "../middleware/userAccess.js";


const userRouter=Router()
// varifyToken,superUserAccess,
userRouter.get('/getAllUser',varifyToken,superUserAccess,allUsers)
userRouter.post('/create',createUser)
userRouter.post('/login',login)
userRouter.delete('/',logout)
userRouter.delete('/deleteUser/:userId',varifyToken,superUserAccess,deleteUser)
userRouter.get('/refresh',generateTokens)
userRouter.post('/changepassword',varifyToken,ChangePassword)
userRouter.get('/test',varifyToken, (req,res,next)=>{
    
    console.log("token is varified")
    console.log(req.username)
    console.log(req.userId)
    res.send("Token is varified")
})


export default userRouter