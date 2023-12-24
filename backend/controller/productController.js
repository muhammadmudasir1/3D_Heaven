import {
    allproduct,
    insertProduct,
    InsertFDM_Specs,
    InsertLeaserCutter_Specs,
    InsertSLA_Specs,
    InsertScanner_Specs,
    findProductById,
    findProductsbyType,
    changePriority,
    findTopFive,
    getFDMSpecs,
    getLeaserCutterSpecs,
    getSLASpecs,
    getScannerSpecs,
    testFunction,
    SearchInProduct,
    productDetail,
    addPurchaseLink,
    updateProduct,
    updatePurchaseLink,
    insertVariant,
    removeProduct,
    removeVariant,
    manufacturerList,
    SearchInProductByType
} from "../services/Product_Service.js";
import createError from 'http-errors'

export const CreateProduct = async (req, res, next) => {
    try {
        let thumbnail=req.files.thumbnail
        let images=req.files.images
        let sdImages=req.files.sdImages
        const product_name=req.body.product_name
        const manufacturer=req.body.manufacturer
        const price_rating=Number(req.body.price_rating)
        const innovation_rating=Number(req.body.innovation_rating)
        const software_rating=Number(req.body.software_rating)
        const customer_service_rating=Number(req.body.customer_service_rating)
        const processing_rating=Number(req.body.processing_rating)
        const overall_rating=Math.round((price_rating+innovation_rating+software_rating+customer_service_rating+processing_rating)/5)
        const productType=Number(req.body.productType)
        const scope_of_delivery_discription=req.body.scope_of_delivery_discription
        const include_in_BestDeals=req.body.include_in_BestDeals
        const discription=req.body.discription
        const variants=req.body.variants

        if(thumbnail){
            createError.BadRequest("Thumbnail is compulsory")
        }
        if(product_name){
            createError.BadRequest("Product Name is compulsory")
        }
        if(productType){
            createError.BadRequest("Product Type is compulsory")
        }
        if(Array.isArray(thumbnail)){
            thumbnail=thumbnail.map((image)=>{
                return image.filename
            })
        }
        if(images){
            images=images.map((image)=>{
                return image.filename
            })

        }
        if(sdImages){
            sdImages=sdImages.map((image)=>{
                return image.filename
            })

        }
        const data={
            product_name,
            manufacturer,
            price_rating,
            innovation_rating,
            software_rating,
            customer_service_rating,
            processing_rating,
            overall_rating,
            scope_of_delivery_discription,
            include_in_BestDeals,
            productType,
            discription,
            images,
            sdImages,
            thumbnail,
            variants
        }
        console.log(req.body)
        const result=await insertProduct(data)

        res.send(result)
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}







export const allProducts = async (req, res, next) => {
    try {
        const data = await allproduct()
        res.send(data)

    } catch (error) {
        console.log(error)
        next(createError.InternalServerError)
    }
}




export const CreateSpecs = async (req, res, next) => {
    try {

        const data = req.body
        const product = await findProductById(req.body.Product_Id)
        const type = product.productType

        switch (Number(type)) {
            case 1: {
                const hasSpecs = await getSLASpecs(product.Id)
                if (hasSpecs) throw new createError.UnprocessableEntity("This product already have an specs")
                await InsertSLA_Specs({ ...data, 'product': product.Id })
                break;
            }

            case 2: {
                const hasSpecs = await getFDMSpecs(product.Id)
                if (hasSpecs) throw new createError.UnprocessableEntity("This product already have an specs")
                await InsertFDM_Specs({ ...data, 'product': product.Id })
                break;
            }

            case 3: {
                const hasSpecs = await getLeaserCutterSpecs(product.Id)
                if (hasSpecs) throw new createError.UnprocessableEntity("This product already have an specs")
                await InsertLeaserCutter_Specs({ ...data, 'product': product.Id })
                break;
            }

            case 4: {
                const hasSpecs = await getScannerSpecs(product.Id)
                if (hasSpecs) throw new createError.UnprocessableEntity("This product already have an specs")
                await InsertScanner_Specs({ ...data, 'product': product.Id })
                break;

            }
        }
        res.send({
            "msg": "Specs is added",
        })

    } catch (error) {
        console.log(`from Create Specs ${error}`)
        next(error)
    }
}


export const getProductsByCategory = async (req, res, next) => {
    try {
        const result = await findProductsbyType(req.params.type)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const changeProductPriority = async (req, res, next) => {
    try {
        const result = await changePriority(req.body.productId, req.body.priority)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

export const getTopFive = async (req, res, next) => {
    try {
        const result = await findTopFive()
        res.send(result)
    } catch (error) {
        next(error)
    }
}


export const Search = async (req, res, next) => {
    try {
        const data = req.query.q
        const searchItems = await SearchInProduct(data)
        res.send(searchItems)
    } catch (error) {
        next(error)
    }
}

export const searchByType = async (req, res, next) => {
    try {
        const type=req.params.type
        const data = req.body.query;
        const searchItems = await SearchInProductByType(data,type)
        res.send(searchItems)
    } catch (error) {
        next(error)
    }
}


export const SingleProduct = async (req, res, next) => {
    try {
        const Id = req.params.productId
        const product = await productDetail(Id)
        if(!product){
           
            throw createError.BadRequest("invalid Product Id")
        }
        res.send(product)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const addPurchaseLinkToProduct = async (req, res, next) => {
    try {
        const data = req.body
        const result = await addPurchaseLink(data)
        res.send("Purchase Link is added")

    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const UpdateProduct=async(req,res,next)=>{
    try {
        const data=req.body
        const productId=req.params.id
        if (data.productType){
            throw createError.UnprocessableEntity("product Type Cant be change")
        }
        const returnData=await updateProduct(productId,data)
        res.send(returnData)
        
    } catch (error) {
        next(error)        
    }
}

export const UpdatePurchaseLink=async(req,res,next)=>{
    try {
        const {purchaseLinkId,productId}=req.body
        const data=req.body.data
        const result=await updatePurchaseLink(productId,purchaseLinkId,data)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const addVariant=async(req,res,next)=>{
    try {
        const {productId,variants}=req.body
        const result =await insertVariant(productId,variants)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

export const deleteProduct = async(req,res,next)=>{
    try {
        const productId=req.params.id
        await removeProduct(productId)
        res.send({"msg":"Product is delete"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const deleteVariant=async(req,res,next)=>{
    try {
        const {productId,variantId}=req.body
        await removeVariant(productId,variantId)
        res.send({"msg":"variant is removed"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getManufacturerList=async(req,res,next)=>{
    try {
        const products = await manufacturerList(req.params.type)
        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}