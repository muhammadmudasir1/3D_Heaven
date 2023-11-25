import Product_Type from "../Models/Product_Type.js";



export const createProductType=async (name)=>{
    const instance=await Product_Type.create({Name:name})
    return instance

} 