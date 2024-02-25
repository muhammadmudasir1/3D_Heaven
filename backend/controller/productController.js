import AmazonScrap from "../helper/AmazonScrap.js"
import Ebay from "../helper/EbayScrap.js"
import GeeksBuyingScrap from "../helper/GeeksBuyingScrap.js"
import TomTopScrap from "../helper/TomTopScrap.js"
import JakeScrap from "../helper/JakeScrap.js"
import OrturScrap from "../helper/OrturScrap.js"
import AnyCubicScrap from "../helper/AnyCubic.js"
import ArtilleryScrap from "../helper/ArtilleryScrap.js"
import BambuLabScrap from "../helper/ScrapBambulab.js"
import CrealityScrap from "../helper/CrealityScrap.js"
import ElegooScrap from "../helper/ElegoScrap.js"
import RevopointScrap from "../helper/RevopointScrap.js"
import SculpfunScrap from "../helper/SculpfunScrap.js"
import TwoTreesScrap from "../helper/TwoTreesScrap.js"
import QidiTechScrap from "../helper/QidiTechScrap.js"
import { unlink } from "fs"
import redisClient from "../helper/init_redis.js"


import {
    allproduct,
    insertProduct,
    InsertFDM_Specs,
    InsertLeaserCutter_Specs,
    InsertSLA_Specs,
    InsertScanner_Specs,
    findProductById,
    findProductsbyType,
    getFDMSpecs,
    getLeaserCutterSpecs,
    getSLASpecs,
    getScannerSpecs,
    SearchInProduct,
    productDetail,
    addPurchaseLink,
    updateProduct,
    updatePurchaseLink,
    insertVariant,
    removeProduct,
    removeVariant,
    manufacturerList,
    SearchInProductByType,
    findPurchaseLinks,
    getPurchaseLinkPrice,
    setNewPriceForPurchaseLink,
    deletePurchaseLink,
    getProductImageById,
    deleteProductImage,
    findThumbnail,
    updateProductImage,
    insertImages,
    updateSLA_Specs,
    updateFDM_Specs,
    updateLeaserCutter_Specs,
    updateScanner_Specs,
    CreateReview,
    findReview,
    changeReviews,
    productList,
    productFilter
} from "../services/Product_Service.js";
import createError from 'http-errors'
import Product from "../Models/Product.js"

export const CreateProduct = async (req, res, next) => {
    try {
        let thumbnail = req.files.thumbnail
        let images = req.files.images
        let sdImages = req.files.sdImages
        const product_name = req.body.product_name
        const manufacturer = req.body.manufacturer
        const price_rating = Number(req.body.price_rating)
        const innovation_rating = Number(req.body.innovation_rating)
        const software_rating = Number(req.body.software_rating)
        const customer_service_rating = Number(req.body.customer_service_rating)
        const processing_rating = Number(req.body.processing_rating)
        const overall_rating = Math.round((price_rating + innovation_rating + software_rating + customer_service_rating + processing_rating) / 5)
        const productType = Number(req.body.productType)
        const scope_of_delivery_discription = req.body.scope_of_delivery_discription
        const include_in_BestDeals = req.body.include_in_BestDeals
        const discription = req.body.discription
        const variants = req.body.variants
        const price = req.body.price

        if (thumbnail) {
            createError.BadRequest("Thumbnail is compulsory")
        }
        if (product_name) {
            createError.BadRequest("Product Name is compulsory")
        }
        if (productType) {
            createError.BadRequest("Product Type is compulsory")
        }
        if (Array.isArray(thumbnail)) {
            thumbnail = thumbnail.map((image) => {
                return image.filename
            })
        }
        if (images) {
            images = images.map((image) => {
                return image.filename
            })

        }
        if (sdImages) {
            sdImages = sdImages.map((image) => {
                return image.filename
            })

        }
        const data = {
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
            variants,
            price
        }
        console.log(req.body)
        const result = await insertProduct(data)

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

export const UpdateSpecs = async (req, res, next) => {
    try {
        const specsId = req.params.specsId
        const { product_id, productType, data } = req.body

        switch (Number(productType)) {
            case 1: {
                const OldSpecs = await getSLASpecs(product_id)
                if (!OldSpecs || OldSpecs.id != specsId) {
                    throw createError.UnprocessableEntity("Not Valid Product or Specs Id")
                }
                await updateSLA_Specs(specsId, data)
                res.send({ 'msg': 'Specs is updated' })
                break;
            }
            case 2: {
                const OldSpecs = await getFDMSpecs(product_id)
                if (!OldSpecs || OldSpecs.id != specsId) {
                    throw createError.UnprocessableEntity("Not Valid Product or Specs Id")
                }
                await updateFDM_Specs(specsId, data)
                res.send({ 'msg': 'Specs is updated' })
                break;
            }
            case 3: {
                const OldSpecs = await getLeaserCutterSpecs(product_id)
                if (!OldSpecs || OldSpecs.id != specsId) {
                    throw createError.UnprocessableEntity("Not Valid Product or Specs Id")
                }
                await updateLeaserCutter_Specs(specsId, data)
                res.send({ 'msg': 'Specs is updated' })
                break;
            }
            case 4: {
                const OldSpecs = await getScannerSpecs(product_id)
                if (!OldSpecs || OldSpecs.id != specsId) {
                    throw createError.UnprocessableEntity("Not Valid Product or Specs Id")
                }
                await updateScanner_Specs(specsId, data)
                res.send({ 'msg': 'Specs is updated' })
                break;
            }
            default: {
                throw createError.UnprocessableEntity("This product not have any specs")
            }
        }



    } catch (error) {
        console.log(error)
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





export const Search = async (req, res, next) => {
    try {
        const data = req.body.query
        // console.log(data)
        const searchItems = await SearchInProduct(data)
        res.send(searchItems)
    } catch (error) {
        next(error)
    }
}


export const searchByType = async (req, res, next) => {
    try {
        const type = req.params.type
        const data = req.body.query;
        const searchItems = await SearchInProductByType(data, type)
        res.send(searchItems)
    } catch (error) {
        next(error)
    }
}


export const SingleProduct = async (req, res, next) => {
    try {
        const Id = req.params.productId
        const product = await productDetail(Id)
        if (!product) {
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
        console.log(data)
        const result = await addPurchaseLink(data)
        res.send("Purchase Link is added")

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const removePurchaseLink = async (req, res, next) => {
    try {
        const purchaseLinkId = req.params.PurchaseLinkId
        const result = await deletePurchaseLink(purchaseLinkId)
        res.send("deleted")
    } catch (error) {
        next(error)
    }
}


export const getPurchaseLinks = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const result = await findPurchaseLinks(productId)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

export const getPrice = async (req, res, next) => {
    const check = async (type, link) => {
        let result
        switch (type) {
            case 1:
                result = await AmazonScrap(link)
                break;
            case 2:
                result = await Ebay(link)
                break;
            case 3:
                result = await GeeksBuyingScrap(link)
                break;
            case 4:
                result = await TomTopScrap(link)
                break;
            case 5:
                result = await JakeScrap(link)
                break;
            case 6:
                result = await OrturScrap(link)
                break;
            case 7:
                result = await AnyCubicScrap(link)
                break;
            case 8:
                result = await ArtilleryScrap(link)
                break;
            case 9:
                result = await BambuLabScrap(link)
                break;
            case 10:
                result = await CrealityScrap(link)
                break;
            case 11:
                result = await ElegooScrap(link)
                break;
            case 12:
                result = await RevopointScrap(link)
                break;
            case 13:
                result = await SculpfunScrap(link)
                break;
            case 14:
                result = await TwoTreesScrap(link)
                break;
            case 15:
                result = await QidiTechScrap(link)
                break;
            default:
                next(createError.UnprocessableEntity("Invalid Sites"))
        }
        if(!result){
            throw Error("Cannot Find price")
        }

        return result
    }
    try {
        const purchaseLinkId = req.params.PurchaseLinkId
        const oldPrices = await getPurchaseLinkPrice(purchaseLinkId)
        const updateTime = new Date(oldPrices.updatedAt)
        let currentTime = new Date()
        if (oldPrices.retrivePriceFlag && (currentTime - updateTime) > 5 * 60 * 60 * 1000) {

            const response = await check(oldPrices.siteType, oldPrices.link)
                console.log(response)
            const data = {
                discountedPrice: response.discountedPrice,
                originalPrice: response.regularPrice,
                unit: response.unit,
            }
            const result = await setNewPriceForPurchaseLink(purchaseLinkId, data)
            if (result) {
                res.send(data)
            }
        }
        else {
            res.send(
                {
                    "discountedPrice": oldPrices.discountedPrice,
                    "originalPrice": oldPrices.originalPrice,
                    "unit": oldPrices.unit,
                })
        }
    } catch (error) {
        try {
            console.log(error)
            res.send(
                {
                    "discountedPrice": oldPrices.discountedPrice,
                    "originalPrice": oldPrices.originalPrice,
                    "unit": oldPrices.unit,
                    "msg": "Price Can't Find by Site"
                })

        } catch (err) {
            console.log(error)
            next(error)
        }
    }
}


export const UpdateProduct = async (req, res, next) => {
    try {
        const data = req.body
        const productId = req.params.productId
        if (data.productType) {
            throw createError.UnprocessableEntity("product Type Cant be change")
        }
        const returnData = await updateProduct(productId, data)
        res.send(returnData)

    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const UpdatePurchaseLink = async (req, res, next) => {
    try {
        const { purchaseLinkId, productId } = req.body
        const data = req.body.data
        const result = await updatePurchaseLink(productId, purchaseLinkId, data)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const addVariant = async (req, res, next) => {
    try {
        const { productId, variants } = req.body
        const result = await insertVariant(productId, variants)
        res.send(result)
    } catch (error) {
        console.log(error)
        next(error)

    }
}


export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const productInstance = await productDetail(productId)
        let oldImages = []
        if (productInstance) {

            oldImages = productInstance.ProductImages.map((image) => {
                return image.path
            })
        }
        else {
            next(createError.NotFound("Product Not Found"))
        }
        await removeProduct(productId)
        oldImages.forEach((image) => {
            unlink(`upload/${image}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
        res.send({ "msg": "Product is delete" })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const deleteVariant = async (req, res, next) => {
    try {
        
        const { productId, variantId } = req.body
        console.log(productId,variantId)
        await removeVariant(productId, variantId)
        res.send({ "msg": "variant is removed" })
    } catch (error) {
        console.log("delete varient__________________________"+error)
        next(error)
    }
}


export const getManufacturerList = async (req, res, next) => {
    try {
        const products = await manufacturerList(req.params.type)
        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getProductsList = async (req, res, next) => {
    try {
        const manufacturers = req.body.manufacturers
        const products = await productList(manufacturers)
        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const filter = async (req, res, next) => {
    try {
        const data = req.body
        const products = await productFilter(data)
        res.send(products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const checkPurchaseLink = async (req, res, next) => {
    try {
        let { siteType, link } = req.body
        siteType = Number(siteType)
        let result
        switch (siteType) {
            case 1:
                result = await AmazonScrap(link)
                break;
            case 2:
                result = await Ebay(link)
                break;
            case 3:
                result = await GeeksBuyingScrap(link)
                break;
            case 4:
                result = await TomTopScrap(link)
                break;
            case 5:
                result = await JakeScrap(link)
                break;
            case 6:
                result = await OrturScrap(link)
                break;
            case 7:
                result = await AnyCubicScrap(link)
                break;
            case 8:
                result = await ArtilleryScrap(link)
                break;
            case 9:
                result = await BambuLabScrap(link)
                break;
            case 10:
                result = await CrealityScrap(link)
                break;
            case 11:
                result = await ElegooScrap(link)
                break;
            case 12:
                result = await RevopointScrap(link)
                break;
            case 13:
                result = await SculpfunScrap(link)
                break;
            case 14:
                result = await TwoTreesScrap(link)
                break;
            case 15:
                result = await QidiTechScrap(link)
                break;
            default:
                next(createError.UnprocessableEntity("Invalid Sites"))
        }
        if(result){
            res.send(result)

        }
        else{
            next(createError("Cannot Find Price"))
        }

    } catch (error) {
        console.log("from product Controller check Purchase Link " + error)
        next(error)
    }
}

export const removeProductImage = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const productInstance = await productDetail(productId)

        if (productInstance) {

            const deletingImage = req.body.imageId
            const oldImages = productInstance.ProductImages.map((image) => {
                return image.id
            })
            const isCorrectImage = oldImages.includes(deletingImage)
            const body = req.body
            console.log({ ...req.body })
            if (isCorrectImage) {
                const deleteingImageInstance = await getProductImageById(deletingImage)

                if (deleteingImageInstance.role !== 1) {
                    const isImageDeleted = await deleteProductImage(deleteingImageInstance.id)
                    if (isImageDeleted) {
                        unlink(`upload/${deleteingImageInstance.path}`, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            return res.send({ "message": "Image is deleted" })
                        })
                    }
                }
                else {
                    console.log("First Set the Image")
                    next(createError.UnprocessableEntity("Set Thumbsnail First"))
                }
            }
            else {
                console.log("Image is not Found")
                next(createError.NotFound("Image is not Found"))
            }
        }
        else {
            next(createError.NotFound("Product Not Found"))
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const setThumbnail = async (req, res, next) => {
    try {

        const productId = req.params.productId
        const imageId = req.body.imageId
        const productInstance = await productDetail(productId)
        if (productInstance) {

            const oldImages = productInstance.ProductImages.map((image) => {
                return image.id
            })
            const isCorrectImage = oldImages.includes(imageId)
            console.log(oldImages)
            if (isCorrectImage) {
                const prevThumnail = await findThumbnail(productId)
                await updateProductImage(prevThumnail[0].id, { role: 2 })
                const newThumbnail = await updateProductImage(imageId, { role: 1 })
                res.send(newThumbnail)
            }
            else {
                next(createError.NotFound("Image is not Found"))
            }

        }
        else {
            next(createError.NotFound("Product is Not Found"))
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const getAllProductImages = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const { ProductImages } = await productDetail(productId)
        res.send(ProductImages)
    } catch (error) {
        next(error)
    }
}

export const addImages = async (req, res, next) => {
    try {
        const productId = req.params.productId

        let images = req.files.images
        if (images) {
            images = images.map((image) => {
                return image.filename
            })
        }
        const productInstance = await productDetail(productId)
        console.log(productInstance.Id)
        if (productInstance.Id) {

            const result = await insertImages(productId, images, 2)
            res.send({ result })

        }
        else {
            images.map((image) => {
                unlink(`upload/${image}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    // return res.send({ "message": "Image is deleted" })
                    console.log(image + " is Deleted")
                })

            })
            throw createError.NotFound("Product is not Found")

        }

    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const addSOCImages = async (req, res, next) => {
    try {
        const productId = req.params.productId

        let images = req.files.images
        if (images) {
            images = images.map((image) => {
                return image.filename
            })
        }
        const productInstance = await productDetail(productId)
        console.log(productInstance.Id)
        if (productInstance.Id) {

            const result = await insertImages(productId, images, 3)
            res.send({ result })

        }
        else {
            images.map((image) => {
                unlink(`upload/${image}`, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    // return res.send({ "message": "Image is deleted" })
                    console.log(image + " is Deleted")
                })

            })
            throw createError.NotFound("Product is not Found")

        }

    } catch (error) {
        console.log(error)
        next(error)
    }

}

export const addReview = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const data = req.body
        const result = await CreateReview(productId, data)
        res.send("ok")
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

export const getReview = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const result = await findReview(productId)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateReview = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const data = req.body
        const result = await changeReviews(productId, data)
        res.send(result)
    }
    catch (error) {
        next(error)
    }
}

export const setTopFive = async (req, res, next) => {
    try {
        const products = req.body.products
        const productsString = JSON.stringify(products);
        await redisClient.set("topfive", productsString);
        res.send(req.body.products)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getTopFive = async (req, res, next) => {
    try {
        let products = await redisClient.get('topfive')
        products = await JSON.parse(products)
        let result = []
        for (let id of products) {
            const product = await findProductById(id)
            result.push(product)
        }
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

export const getThumbnail=async(req,res,next)=>{
    const productId = req.params.productId
    try {
        const result=await findThumbnail(productId)
        res.send(result)
    } catch (error) {
        next(error)
    }
}