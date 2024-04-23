import redisClient from "../helper/init_redis.js"
import CreateError from 'http-errors'
import Review from "../Models/Review.js"
import newsLetter from "../Models/newsLetter.js"


export const getHeader=async(req,res,next)=>{
    try {
        const headerName=req.params.header
        console.log(headerName)
        const headerContent=await redisClient.get(headerName)
        const responseData=JSON.parse(headerContent)
        res.send(responseData)
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}
export const saveHeader=async(req,res,next)=>{
    try {
        const headerNames=['slaHeader','fdmHeader','laserHeader','scannarHeader','filamentHeader','newsHeader','tutorialHeader']
        const headerName=req.params.header
        if (headerNames.includes(headerName)){
            CreateError.BadRequest("Wrong Header Key")
        }
        const headerContent=JSON.stringify(req.body.headerContent) 
        console.log(headerName)
        const response=redisClient.set(headerName,headerContent)
        res.send({"message":"Header is Save"})
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const getImprint=async(req,res,next)=>{
    try {
        const review=await Review.findAll({where:{"isImprint":true},limit:1})
        res.send(review)
        
    } catch (error) {
        next(error)
    }

}

export const saveImprint=async(req,res,next)=>{
    try {
        const data=req.body.imprint
        // console.log(data)
        if(data){
            const review=await Review.findAll({where:{"isImprint":true},limit:1})
            if (review.length>0){
                // console.log(review[0].id)
                await Review.update({"review":data},{where:{"id":review[0].id}})
            }
            else{
                await Review.create({'review':data,'isImprint':true})

            }
        }
        res.send({"message":"Imprint is Save"})
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const getDataPolicy=async(req,res,next)=>{
    try {
        const review=await Review.findAll({where:{"isDataProtection":true},limit:1})
        res.send(review)
        
    } catch (error) {
        next(error)
    }

}
export const saveDataPolicy=async(req,res,next)=>{
    try {
        const data=req.body.imprint
        if(data){
            const review=await Review.findAll({where:{"isDataProtection":true},limit:1})
            if (review.length>0){
                await Review.update({"review":data},{where:{"id":review[0].id}},)
            }
            else{
                await Review.create({'review':data,'isDataProtection':true})

            }
        }
        res.send({"message":"isDataProtection is Save"})
        
    } catch (error) {
        console.log(error)
        next(error)
    }

}
export const saveNewsLetter=async(req,res,next)=>{
    try {
        const data=req.body.email
        console.log(data)
        if(data){
            const review=await newsLetter.create({email:data})
        }
        res.send({"message":"Email is Save"})

    } catch (error) {
        console.log(error)
        next(error)
    }

}
export const getNewsLetter=async(req,res,next)=>{
    try {
        const data=req.body.email
        // if(data){
        const review=await newsLetter.findAll({attributes:["email","createdAt"]})
        res.send(review)
        // }

    } catch (error) {
        console.log(error)
        next(error)
    }

}