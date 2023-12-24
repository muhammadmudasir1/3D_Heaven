import express from 'express'
import {
    CreateProduct,
    CreateSpecs,
    allProducts,
    getProductsByCategory,
    changeProductPriority,
    getTopFive,
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
} from "../controller/productController.js"

import upload from '../middleware/fileUpload.js'
import handleCreateProductImages from '../helper/handleCreateProductImages.js'
import handleUpdateProductImages from '../helper/handleUpdateProductImages.js'


const route = express.Router()
    
    route.get('/',allProducts)
    route.get('/type/:type',getProductsByCategory)
    
    route.post('/Specs',CreateSpecs)
    route.post('/changePriority',changeProductPriority)
    route.get('/topFive',getTopFive)
    route.post('/',upload.fields([
        {name:"thumbnail"},
        {name:"images"},
        {name:"sdImages"}
    ]),CreateProduct)
    route.get('/search',Search)
    route.post('/searchbytype/:type',searchByType)
    route.get('/:productId',SingleProduct)
    route.post('/addPurchaseLinks',addPurchaseLinkToProduct)
    route.post('/addVariants',addVariant)
    route.delete('/removeVariant',deleteVariant)
    route.get('/manufacturerList/:type',getManufacturerList)
    route.delete('/:id',deleteProduct)
    
    
    route.patch("/updatePurchaseLink",UpdatePurchaseLink)
    route.patch('/:id',upload.fields([
        {name:"images",maxCount:5},
        {name:"thumbnail"},
        {name:"scope_of_delivery_images", maxCount:5}
    ]),handleUpdateProductImages,UpdateProduct)

    




export default route

