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
    getTopFive,
    getProductsList,
    filter
} from "../controller/productController.js"
import verifyToken from '../middleware/verifyToken.js'
import upload from '../middleware/fileUpload.js'

const route = express.Router()
    
    route.get('/',allProducts)
    route.get('/type/:type',getProductsByCategory)
    route.patch('/removeVariant',verifyToken,deleteVariant)
    route.patch('/:productId',verifyToken,UpdateProduct)
    route.post('/Specs',CreateSpecs)
    route.patch('/specs/:specsId',verifyToken,UpdateSpecs)
    route.post('/',upload.fields([
        {name:"thumbnail"},
        {name:"images"},
        {name:"sdImages"}
    ]),CreateProduct)
    route.get("/TopFive/",getTopFive)
    route.post('/search',Search)
    route.post('/searchbytype/:type',searchByType)
    route.get('/:productId',SingleProduct)
    route.post('/addPurchaseLinks',verifyToken,addPurchaseLinkToProduct)
    route.get('/PurchaseLinks/:productId',getPurchaseLinks)
    route.delete('/PurchaseLinks/:PurchaseLinkId',verifyToken,removePurchaseLink)
    route.get('/Price/:PurchaseLinkId',getPrice)
    route.post('/addVariants',verifyToken,addVariant)
    
    route.get('/manufacturerList/:type',getManufacturerList)
    route.post('/productList/',getProductsList)
    route.post('/filter',filter)
    route.delete('/:id',verifyToken,deleteProduct)
    route.post('/check',verifyToken,checkPurchaseLink)
    route.patch('/removeImage/:productId',verifyToken,removeProductImage)
    route.get('/getImages/:productId',getAllProductImages)
    route.patch("/updatePurchaseLink",UpdatePurchaseLink)
    route.post("/review/:productId",verifyToken,addReview)
    route.get("/review/:productId",getReview)
    route.patch("/review/:productId",verifyToken,updateReview)
    route.post("/TopFive/",verifyToken,setTopFive)
    route.patch('/addImages/:productId',verifyToken,upload.fields([
        {name:"images",maxCount:5}
    ]),addImages)
    route.patch('/addsodimages/:productId',verifyToken,upload.fields([
        {name:"images",maxCount:5}
    ]),addSOCImages)
    
    route.patch('/changeThumbnail/:productId',verifyToken,setThumbnail)
    

    




export default route

