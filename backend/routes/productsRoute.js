import express from 'express'
import {CreateProduct, CreateSpecs, allProducts,getProductsByCategory,changeProductPriority, getTopFive} from "../controller/productController.js"
import upload from '../middleware/fileUpload.js'
import handleCreateProductImages from '../helper/handleCreateProductImages.js'


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


export default route

