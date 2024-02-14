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
import {adminAccess,EditorAccess} from '../middleware/userAccess.js'

const route = express.Router()
    
    route.get('/',allProducts)
    route.get('/type/:type',getProductsByCategory)
    route.patch('/removeVariant',verifyToken,adminAccess,deleteVariant)
    route.patch('/:productId',verifyToken,adminAccess,UpdateProduct)
    route.post('/Specs',adminAccess,CreateSpecs)
    route.patch('/specs/:specsId',verifyToken,adminAccess,UpdateSpecs)
    route.post('/',upload.fields([
        {name:"thumbnail"},
        {name:"images"},
        {name:"sdImages"}
    ]),adminAccess,CreateProduct)
    route.get("/TopFive/",getTopFive)
    route.post('/search',Search)
    route.post('/searchbytype/:type',searchByType)
    route.get('/:productId',SingleProduct)
    route.post('/addPurchaseLinks',verifyToken,adminAccess,addPurchaseLinkToProduct)
    route.get('/PurchaseLinks/:productId',getPurchaseLinks)
    route.delete('/PurchaseLinks/:PurchaseLinkId',verifyToken,adminAccess,removePurchaseLink)
    route.get('/Price/:PurchaseLinkId',getPrice)
    route.post('/addVariants',verifyToken,adminAccess,addVariant)
    route.get('/manufacturerList/:type',getManufacturerList)
    route.post('/productList/',getProductsList)
    route.post('/filter',filter)
    route.delete('/:id',verifyToken,adminAccess,deleteProduct)
    route.post('/check',verifyToken,adminAccess,checkPurchaseLink)
    route.patch('/removeImage/:productId',verifyToken,adminAccess,removeProductImage)
    route.get('/getImages/:productId',getAllProductImages)
    route.patch("/updatePurchaseLink",verifyToken,adminAccess,UpdatePurchaseLink)
    route.post("/review/:productId",verifyToken,EditorAccess,addReview)
    route.get("/review/:productId",getReview)
    route.patch("/review/:productId",verifyToken,EditorAccess,updateReview)
    route.post("/TopFive/",verifyToken,adminAccess,setTopFive)
    route.patch('/addImages/:productId',verifyToken,adminAccess,upload.fields([
        {name:"images",maxCount:5}
    ]),addImages)
    route.patch('/addsodimages/:productId',verifyToken,adminAccess,upload.fields([
        {name:"images",maxCount:5}
    ]),addSOCImages)
    
    route.patch('/changeThumbnail/:productId',verifyToken,adminAccess,setThumbnail)
    

    




export default route

