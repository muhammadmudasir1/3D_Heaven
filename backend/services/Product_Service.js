import Product from "../Models/Product.js"
import CreateError from "http-errors"
import SLA_specs from "../Models/SLA_specs.js"
import FDM_specs from "../Models/FDM_specs.js"
import Scanner_specs from "../Models/Scanner_specs.js"
import LeaserCutter_specs from "../Models/leaserCutter.js"
import { Op } from "sequelize"
import ProductVariant from "../Models/ProductVarient.js"
import purchaseLinks from "../Models/purchaseLinks.js"


export const allproduct = async () => {
    return await Product.findAndCountAll()
}


export const findProductsbyType = async (type) => {
    return await Product.findAll({
        where: { productType: type },
        attributes: ['Id', 'product_name', 'manufacturer', 'discription', 'price', 'thumbnail', 'include_in_BestDeals']
    },)
}



export const insertProduct = async (data) => {
    try {
        const instance = await Product.create(data)
        if (data.variants) {
            const variants = await instance.addVariant(data.variants)
            variants.map(async (variant) => {
                const tempProduct = await Product.findByPk(variant.dataValues.variantId)
                tempProduct.addVariant(instance.Id)
            })
        }
        return instance.Id

    } catch (error) {
        console.error(`from Product_service/insertProduct ${error}`)
        throw new Error(CreateError.InternalServerError())
    }
}

export const InsertSLA_Specs = async (data) => {
    const instance = await SLA_specs.create(data)
    return instance
}
export const InsertFDM_Specs = async (data) => {
    const instance = await FDM_specs.create(data)
    return instance
}
export const InsertScanner_Specs = async (data) => {
    const instance = await Scanner_specs.create(data)
    return instance
}
export const InsertLeaserCutter_Specs = async (data) => {
    const instance = await LeaserCutter_specs.create(data)
    return instance
}

export const findProductById = async (id) => {
    const instance = await Product.findByPk(id)
    return instance
}



export const changePriority = async (id, newPriority) => {
    console.log(newPriority)
    const oldSets = await Product.findOne({ where: { priority: newPriority } })
    const currentProduct = await Product.findByPk(id)
    if (oldSets && oldSets.priority <= 5) {
        await currentProduct.update({ priority: newPriority })
        await currentProduct.save()
        await oldSets.update({ priority: 0 })
        await oldSets.save()
    }
    else {
        await currentProduct.update({ priority: newPriority })
        await currentProduct.save()
    }
    return { newPriority }

}

export const findTopFive = async () => {
    try {
        const result = await Product.findAll({
            order: [['priority', 'DESC']],
            limit: 5,
            attributes: ['Id', 'thumbnail', 'product_name', 'priority']
        })
        return result
    } catch (error) {
        next(error)
    }
}


export const getScannerSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: Scanner_specs })
        return instance.scanner


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}

export const getFDMSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: FDM_specs })
        return instance.FDM


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}

export const getSLASpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: SLA_specs })
        return instance.SLA


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}

export const getLeaserCutterSpecs = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: LeaserCutter_specs })
        return instance.LeaserCutter


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}

export const SearchInProduct = async (SearchQuery) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.iLike]: `${SearchQuery}`
                        }
                    },
                    {
                        manufacturer: {
                            [Op.iLike]: `${SearchQuery}`
                        }
                    }
                ]
            }
        })
        return products
    } catch (error) {
        console.log(`From Product Services SearchInProducts ${error}`)
        return error
    }
}




export const testFunction = async (id) => {
    try {
        const instance = await Product.findByPk(id, { include: Scanner_specs })
        return instance.scanner


    } catch (error) {
        console.log("From Product Services testFunction " + error)
        return error
    }
}

export const productDetail = async (id) => {
    try {
        const instance = await Product.findByPk(id,
            {
                include:
                    [SLA_specs,
                        FDM_specs,
                        Scanner_specs,
                        LeaserCutter_specs,
                        purchaseLinks,
                        {
                            'association': 'variants',
                            attributes:['Id', 'product_name'],
                            include: [SLA_specs, FDM_specs, Scanner_specs, LeaserCutter_specs]
                        }
                    ]
            })
        
        return instance
    } catch (error) {
        console.log(`From Product Service ProductDetail ${error}`)
        return error

    }
}

export const addPurchaseLink=async(data)=>{
    try {
        const links=data.purchaseLinks
        const product=await Product.findByPk(data.productId)
        links.map(async(link)=>{
            await purchaseLinks.create({...link,"product":product.Id})
        })
        
        
        return product 
    } catch (error) {
        console.log(`from Product Servics addPurchaseLink ${error}`)
    }
}

export const updateProduct  =async(id,data)=>{
    await Product.update(data,
        {where:{
            Id:id
        }})
    return data
}

export const updatePurchaseLink=async(productId,purchaseId,data)=>{
    const result=await purchaseLinks.update(data,{
        where:{
            product:productId,
            purchaseLinksId:purchaseId
        }
    })
    return result

}

export const insertVariant=async(productId,variantsList)=>{
    const instance=await Product.findByPk(productId)
    if (variantsList) {
        const variants = await instance.addVariant(variantsList)
        variants.map(async (variant) => {
            const tempProduct = await Product.findByPk(variant.dataValues.variantId)
            tempProduct.addVariant(instance.Id)
        })
    }
    return true
}

export const removeProduct=async(productId)=>{
    return await Product.destroy({
        where:{
            Id:productId
        }
    })
}

export const removeVariant=async(product,variant)=>{
    return await ProductVariant.destroy({
        where:
        {
        [Op.or]:[
            {
                productId:product,
                variantId:variant 

            },
            {
                productId:variant,
                variantId:product 

            },
            
        ]

        }
    
    })
}