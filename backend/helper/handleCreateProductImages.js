import createError from "http-errors"

const handleCreateProductImages =(req,res,next)=>{
    try {
        let thumbnail=''
        let images=''
        let scope_of_delivery_images= req.files.scope_of_delivery_images?
        req.files.scope_of_delivery_images.map((image)=>{
            return image.filename
        }):null
        console.log(req.files)
        if(req.files.thumbnail){
            console.log("from thumbnail")
            thumbnail=req.files.thumbnail[0].filename
            images=req.files.images ? (req.files.images).map((image)=>{
                return image.filename
            }):null
            console.log(thumbnail)
        }
        else if(req.files.images){
            thumbnail=req.files.images[0].filename
            images= req.files.images.length>1? (req.files.images).slice(1).map((image)=>{
                return image.filename
            }):null
        }
        else{
            throw new Error(createError.BadRequest("Thumbnail is compulsory"))
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