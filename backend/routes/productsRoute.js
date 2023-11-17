import express from 'express'

const route = express.Router()


route.get('/',(req,res,send)=>{
    res.send('products')
})


export default route

