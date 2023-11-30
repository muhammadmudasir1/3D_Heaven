


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
    updateProduct
} from "../services/Product_Service.js";
import createError from 'http-errors'


export const allProducts = async (req, res, next) => {
    try {
        const data = await allproduct()
        res.send(data)

    } catch (error) {
        console.log(error)
        next(createError.InternalServerError)
    }
}

export const CreateProduct = async (req, res, next) => {
    try {
        const data = req.body
        const Product_Id = await insertProduct(data)
        res.send({
            "msg": "Product is added",
            Product_Id
        })

    } catch (error) {
        console.log(error)
        next(createError.UnprocessableEntity("invalid Data"))
    }
}


export const CreateSpecs = async (req, res, next) => {
    try {

        const data = req.body
        const product = await findProductById(req.body.Product_Id)
        console.log(req.body.Product_Id)
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
                console.log(hasSpecs)
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

export const test = async (req, res, next) => {
    try {
        const testVar = await testFunction(req.body.id)
        console.log(testVar)
        res.send(testVar)
    }
    catch (error) {
        console.log(error)
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

export const SingleProduct = async (req, res, next) => {
    try {
        const Id = req.params.productId
        const product = await productDetail(Id)
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
        await updateProduct(data)
    } catch (error) {
        next(error)        
    }
}