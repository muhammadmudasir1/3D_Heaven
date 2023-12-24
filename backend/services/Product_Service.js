import Product from "../Models/Product.js"
import CreateError from "http-errors"
import SLA_specs from "../Models/SLA_specs.js"
import FDM_specs from "../Models/FDM_specs.js"
import Scanner_specs from "../Models/Scanner_specs.js"
import LeaserCutter_specs from "../Models/leaserCutter.js"
import { Op,fn,col } from "sequelize"
import ProductVariant from "../Models/ProductVarient.js"
import purchaseLinks from "../Models/purchaseLinks.js"
import ProductImages from "../Models/productImages.js"


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
        const instance = await Product.create(data)
        if (data.variants) {

            const variants = await instance.addVariant(data.variants)
            variants.map(async (variant) => {
                const tempProduct = await Product.findByPk(variant.dataValues.variantId)
                tempProduct.addVariant(instance.Id)
            })
        }
        await ProductImages.create({path:data.thumbnail[0],role:1,ProductId:instance.Id})
        if(data.images){
            data.images.forEach(async (image) => {
                await ProductImages.create({path:image,role:2,ProductId:instance.Id})
            });
        }
        if(data.sdImages){
            data.sdImages.forEach(async(image)=>{
                await ProductImages.create({path:image,role:3,ProductId:instance.Id})
            })

        }

        return instance.Id
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
            },
            
        })
        return products
    } catch (error) {
        console.log(`From Product Services SearchInProducts ${error}`)
        return error
    }
}

export const SearchInProductByType = async (SearchQuery,type) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        product_name: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    },
                    {
                        manufacturer: {
                            [Op.iLike]: `%${SearchQuery}%`
                        }
                    }
                ],
                productType:type   
            },
            attributes: ['Id', 'product_name'],
            include:{
                model:ProductImages,
                where:{
                    role:1
                },
                attributes:['path']

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

export const manufacturerList=async(type)=>{
    const manufacturer = await Product.findAll({where:{
        productType:type
    },
    attributes:[fn('DISTINCT', col('manufacturer')),'manufacturer']

})
    return manufacturer
}