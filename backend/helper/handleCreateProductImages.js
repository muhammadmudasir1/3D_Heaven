import createError from "http-errors"

const handleCreateProductImages =(req,res,next)=>{
    try {
        let thumbnail=''
        let images=''
        console.log(" ")
        console.log(" ")
        console.log(req)
        console.log(" ")
        console.log(" ")
        let scope_of_delivery_images= req.files.scope_of_delivery_images?
        req.files.scope_of_delivery_images.map((image)=>{
            return image.filename
        }):null

        if(req.files.thumbnail){
            thumbnail=req.files.thumbnail[0].filename
            images=req.files.images ? (req.files.images).map((image)=>{
                return image.filename
            }):null
        }
        else if(req.files.images){
            thumbnail=req.files.images[0].filename
            images= req.files.images.length>1? (req.files.images).slice(1).map((image)=>{
                return image.filename
            }):null
        }
        else{
            throw createError.BadRequest("Thumbnail is compulsory")
        }
        req.body={
            ...req.body,
            thumbnail,
            images,
            scope_of_delivery_images
        }

        next()
    }
    catch(error){
        console.log(error)
        next(error)
    }

}

export default handleCreateProductImages