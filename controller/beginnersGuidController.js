import { InsertBeginnersGuid,removeBeginnersGuid,getBeginnersGuid,getBeginnersGuidById,updateBeginnersGuid,removeImageFromBeginnersGuid } from "../services/beginnersGuid_Service.js"
import CreateError from "http-errors"


export const CreateBeginnersGuid=async(req,res,next)=>{
    try {
        const data=req.body
        data.image=req.file.filename
        const result=await InsertBeginnersGuid(data)
        res.send(result)
        
    } catch (error) {
        next(CreateError.InternalServerError())
    }

}



export const UpdateBeginnersGuid=async(req,res,next)=>{
    try {
        const data=req.body
        const Id=req.params.id
        if (req.file){

            data.image=req.file.filename
        }
        const result=await updateBeginnersGuid(Id,data)
        res.send({"msg":"News is Updated"})
        
    } catch (error) {
        console.log(error)
        next(CreateError.InternalServerError())
    }
}

export const getAllBeginnersGuid=async(req,res,next)=>{
    try {
        console.log("beginners Guid")
        const result =await getBeginnersGuid()
        res.send(result)
    } catch (error) {
        next(CreateError.InternalServerError())
    }
}

export const beginnersGuidById=async(req,res,next)=>{
    try {
        const Id=req.params.id
        console.log("news id is "+Id)
        const result=await getBeginnersGuidById(Id)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(CreateError.InternalServerError())
    }
}

export const deleteBeginnersGuid=async (req,res,next)=>{
    const Id=req.params.id
    const result=await removeBeginnersGuid(Id)
    res.send("This is delete News")
}

export const removeImageFromBG=async (req,res,next)=>{
    try {    
        const Id=req.params.id
        const result=await removeImageFromBeginnersGuid(Id)
        res.send("This is delete News")
    } catch (error) {
        console.log(error)
        next(error)       
    }

}