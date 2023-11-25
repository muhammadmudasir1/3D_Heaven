import Product from "../Models/Product.js"
import CreateError from "http-errors"
import SLA_specs from "../Models/SLA_specs.js"
import FDM_specs from "../Models/FDM_specs.js"
import Scanner_specs from "../Models/Scanner_specs.js"
import LeaserCutter_specs from "../Models/leaserCutter.js"



export const allproduct=async ()=>{
    return await Product.findAndCountAll()
}



export const insertProduct=async(data)=>{
    try {
        const instance=await Product.create({...data,"product_Type_Id":data.type})
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