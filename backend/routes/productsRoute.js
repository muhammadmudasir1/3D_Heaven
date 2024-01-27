import express from 'express'
import {
    CreateProduct,
    CreateSpecs,
    allProducts,
    getProductsByCategory,
    Search,
    SingleProduct,
    addPurchaseLinkToProduct,
    UpdateProduct,
    UpdatePurchaseLink,
    addVariant,
    deleteProduct,
    deleteVariant,
    getManufacturerList,
    searchByType,
    checkPurchaseLink,
    getPurchaseLinks,
    getPrice,
    removePurchaseLink,
    removeProductImage,
    setThumbnail,
    getAllProductImages,
    addImages,
    addSOCImages,
    UpdateSpecs,
    addReview,
    getReview,
    updateReview,
    setTopFive,
    getTopFive
} from "../controller/productController.js"

import upload from '../middleware/fileUpload.js'


const route = express.Router()
    
    route.get('/',allProducts)
    route.get('/type/:type',getProductsByCategory)
    route.patch('/:productId',UpdateProduct)
    route.post('/Specs',CreateSpecs)
    route.patch('/specs/:specsId',UpdateSpecs)
    route.post('/',upload.fields([
        {name:"thumbnail"},
        {name:"images"},
        {name:"sdImages"}
    ]),CreateProduct)
    route.get("/TopFive/",getTopFive)
    route.post('/search',Search)
    route.post('/searchbytype/:type',searchByType)
    route.get('/:productId',SingleProduct)
    route.post('/addPurchaseLinks',addPurchaseLinkToProduct)
    route.get('/PurchaseLinks/:productId',getPurchaseLinks)
    route.delete('/PurchaseLinks/:PurchaseLinkId',removePurchaseLink)
    route.get('/Price/:PurchaseLinkId',getPrice)
    route.post('/addVariants',addVariant)
    route.patch('/removeVariant',deleteVariant)
    route.get('/manufacturerList/:type',getManufacturerList)
    route.delete('/:id',deleteProduct)
    route.post('/check', checkPurchaseLink)
    route.patch('/removeImage/:productId',removeProductImage)
    route.get('/getImages/:productId',getAllProductImages)
    route.patch("/updatePurchaseLink",UpdatePurchaseLink)
    route.post("/review/:productId",addReview)
    route.get("/review/:productId",getReview)
    route.patch("/review/:productId",updateReview)
    route.post("/TopFive/",setTopFive)
    route.patch('/addImages/:productId',upload.fields([
        {name:"images",maxCount:5}
    ]),addImages)
    route.patch('/addsodimages/:productId',upload.fields([
        {name:"images",maxCount:5}
    ]),addSOCImages)
    
    route.patch('/changeThumbnail/:productId',setThumbnail)
    

    




export default route

