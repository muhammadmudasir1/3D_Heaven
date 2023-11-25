import { createProductType } from "../services/ProductType_Services.js";
import { allproduct,insertProduct,InsertFDM_Specs,InsertLeaserCutter_Specs,InsertSLA_Specs,InsertScanner_Specs, findProductById} from "../services/Product_Service.js";
import createError from 'http-errors'



export const allProducts=async(req,res,next)=>{
    try {
        const data = await allproduct()
        res.send(data)
        
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError)
    }
}

export const CreateProduct=async(req,res,next)=>{
    try {
        const data=req.body
        const Product_Id=await insertProduct(data)
        res.send({
            "msg":"Product is added",
            Product_Id
        })

    } catch (error) {
        console.log(error)
        next(createError.UnprocessableEntity("invalid Data"))
    }
}

export const CreateType=async(req,res,next)=>{
    try {
        const name=req.body.name
        const data= await createProductType(name.toUpperCase())
        res.send(data)
        
    } catch (error) {
        next(createError.UnprocessableEntity("Type is already exist or invalid input"))
    }
}

export const CreateSpecs= async(req,res,next)=>{
    try {
        
        const data=req.body
        const product=await findProductById(req.body.Product_Id)
        const productJSON=await product.toJSON()
        const type=productJSON.product_Type_Id
        
        let result
        switch(type){
            case 1:
                console.log("from SLA")
                result=await InsertSLA_Specs({...data,"product":product.Id})
                break;
                
            case 2:
                console.log("from FDM")
                result=await InsertFDM_Specs({...data,"product":product.Id})
                break;
            case 3:
                console.log("from Leaser")
                result=await InsertLeaserCutter_Specs({...data,"product":product.Id})
                break;
            case 4:
                console.log("from Scanner")
                result=await InsertScanner_Specs({...data,"product":product.Id})
                break;
            

        }
        

        console.log(type)
        res.send({
            "msg":"Specs is added",
        })



    } catch (error) {
        console.log(`from Create Specs ${error}`)
    }
}