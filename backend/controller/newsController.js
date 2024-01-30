import { InsertNews,removeNews,getNews,getNewsById,updateNews,removeImageFromNews } from "../services/News_Service.js"
import CreateError from "http-errors"


export const CreateNews=async(req,res,next)=>{
    try {
        const data=req.body
        data.image=req.file.filename
        const result=await InsertNews(data)
        res.send(result)
        
    } catch (error) {
        next(CreateError.InternalServerError())
    }

}



export const UpdateNews=async(req,res,next)=>{
    try {
        const data=req.body
        const Id=req.params.id
        if (req.file){

            data.image=req.file.filename
        }
        const result=await updateNews(Id,data)
        res.send({"msg":"News is Updated"})
        
    } catch (error) {
        console.log(error)
        next(CreateError.InternalServerError())
    }
}

export const getAllNews=async(req,res,next)=>{
    try {
        const result =await getNews()
        res.send(result)
    } catch (error) {
        next(CreateError.InternalServerError())
    }
}

export const NewsById=async(req,res,next)=>{
    try {
        const Id=req.params.id
        console.log("news id is "+Id)
        const result=await getNewsById(Id)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(CreateError.InternalServerError())
    }
}

export const deleteNews=async (req,res,next)=>{
    const Id=req.params.id
    const result=await removeNews(Id)
    res.send("This is delete News")
}

export const removeImage=async (req,res,next)=>{
    try {    
        const Id=req.params.id
        const result=await removeImageFromNews(Id)
        res.send("This is delete News")
    } catch (error) {
        console.log(error)
        next(error)       
    }

}