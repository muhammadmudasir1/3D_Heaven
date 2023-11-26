import Product from "../Models/Product.js"
import CreateError from "http-errors"
import SLA_specs from "../Models/SLA_specs.js"
import FDM_specs from "../Models/FDM_specs.js"
import Scanner_specs from "../Models/Scanner_specs.js"
import LeaserCutter_specs from "../Models/leaserCutter.js"
import { where } from "sequelize"



export const allproduct=async ()=>{
    return await Product.findAndCountAll()
}


export const findProductsbyType= async(type)=>{
    return await Product.findAll({
        where:{productType:type},
        attributes:['Id', 'product_name', 'manufacturer','discription','price','thumbnail','include_in_BestDeals']
    },)
}



export const insertProduct=async(data)=>{
    try {
        
        // return data
        console.log(data)
        const QueryData={
        product_name:data.product_name,
        manufacturer:data.manufacturer,
        weight:data.weight,
        diemention:data.diemention,
        price_rating:data.price_rating,
        innovation_rating:data.innovation_rating,
        software_rating:data.software_rating,
        customer_service_rating:data.customer_service_rating,
        processing_rating:data.processing_rating,
        overall_rating:data.overall_rating,
        pros:data.pros,
        cons:data.cons,
        technical_data:data.technical_data,
        first_impression:data.first_impression,
        images:data.images,
        thumbnail:data.thumbnail,
        scope_of_delivery_discription:data.scope_of_delivery_discription,
        scope_of_delivery_images:data.scope_of_delivery_images,
        include_in_BestDeals:data.include_in_BestDeals,
        productType:data.ProductType
        
        }
        console.log(QueryData)

        const instance=await Product.create(QueryData)
        if (data.varients){
            if (Array.isArray(data.varients)){
                const varients=await Product.findAll({where:{Id:data.varients}})
                varients.map(async (varient)=>{
                    await instance.addVariant(varient)
                    console.log(varients)
                })
                console.log(varients)
            }
        }


        return instance.Id
        
    } catch (error) {
        console.error(`from Product_service/insertProduct ${error}`)
        throw new Error(CreateError.InternalServerError())   
    }
}

export const InsertSLA_Specs=async(data)=>{
    const instance=await SLA_specs.create(data)
    return instance
}
export const InsertFDM_Specs=async(data)=>{
    const instance=await FDM_specs.create(data)
    return instance
}
export const InsertScanner_Specs=async(data)=>{
    const instance=await Scanner_specs.create(data)
    return instance
}
export const InsertLeaserCutter_Specs=async(data)=>{
    const instance=await LeaserCutter_specs.create(data)
    return instance
}

export const findProductById=async(id)=>{
    const instance=await Product.findByPk(id)
    return instance
}



export const changePriority=async(id,newPriority)=>{
    console.log(newPriority)
    const oldSets=await Product.findOne({where:{priority:newPriority}})
    const currentProduct=await Product.findByPk(id)
    if (oldSets && oldSets.priority<=5){
        await currentProduct.update({priority:newPriority})
        await currentProduct.save()
        await oldSets.update({priority:0})
        await oldSets.save()
    }
    else{
        await currentProduct.update({priority:newPriority})
        await currentProduct.save()
    }
    return {newPriority}

}

export const findTopFive=async()=>{
    try {
        const result =await Product.findAll({
            order:[['priority','DESC']],
            limit:5,
            attributes:['Id','thumbnail','product_name','priority']
        })
        return result
    } catch (error) {
        next(error)
    }
}