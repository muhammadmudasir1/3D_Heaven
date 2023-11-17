import { Router } from "express"
import {addProduct, getAllProducts} from "../controller/productController.js"
import upload from "../helper/fileUploadMiddleware.js"

const productRoutes=Router()

productRoutes.get("/",getAllProducts)

productRoutes.post('/',upload.array('files',6),addProduct)

export default productRoutes
