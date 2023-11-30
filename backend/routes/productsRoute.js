import express from 'express'
import {
    CreateProduct,
    CreateSpecs,
    allProducts,
    getProductsByCategory,
    changeProductPriority,
    getTopFive,
    test,
    Search,
    SingleProduct,
    addPurchaseLinkToProduct,
    UpdateProduct,
} from "../controller/productController.js"

import upload from '../middleware/fileUpload.js'
import handleCreateProductImages from '../helper/handleCreateProductImages.js'
import handleUpdateProductImages from '../helper/handleUpdateProductImages.js'


const route = express.Router()


route.get('/',allProducts)
route.get('/type/:type',getProductsByCategory)
route.post('/',upload.fields([
    {name:"images",maxCount:5},
    {name:"thumbnail"},
    {name:"scope_of_delivery_images", maxCount:5}
]),handleCreateProductImages,CreateProduct)

route.post('/Specs',CreateSpecs)
route.post('/changePriority',changeProductPriority)
route.get('/topFive',getTopFive)
route.post('/test',test)
route.get('/search',Search)
route.get('/:productId',SingleProduct)
route.post('/addPurchaseLinks',addPurchaseLinkToProduct)

route.patch('/:id',upload.fields([
    {name:"images",maxCount:5},
    {name:"thumbnail"},
    {name:"scope_of_delivery_images", maxCount:5}
]),handleUpdateProductImages,UpdateProduct)



export default route

