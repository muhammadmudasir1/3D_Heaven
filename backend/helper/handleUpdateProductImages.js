import createError from "http-errors"

const handleUpdateProductImages =(req,res,next)=>{
    try {
        
        let thumbnail=''
        let images=''
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

export default handleUpdateProductImages