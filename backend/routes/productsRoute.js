import express from 'express'
import {CreateProduct, CreateSpecs, CreateType, allProducts} from "../controller/productController.js"
import upload from '../middleware/fileUpload.js'
import handleCreateProductImages from '../helper/handleCreateProductImages.js'


const route = express.Router()


route.get('/',allProducts)
route.post('/',upload.fields([
    {name:"images",maxCount:5},
    {name:"thumbnail"},
    {name:"scope_of_delivery_images", maxCount:5}
]),handleCreateProductImages,CreateProduct)

route.post('/Specs',CreateSpecs)

route.post('/createType',CreateType)


export default route

