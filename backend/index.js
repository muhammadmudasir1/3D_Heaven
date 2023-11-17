import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import route from './routes/productsRoute.js'
import {connectDatabase} from './helper/sequelize_config.js'

dotenv.config()
const PORT=process.env.PORT || 3500

const app = express()
connectDatabase()



app.use(morgan('dev'))

app.use('/products',route)



app.use((req,res,next)=>{
    next(createError.NotFound("invalid Url or page is not found"))
})

app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.send(error)
})


app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})











