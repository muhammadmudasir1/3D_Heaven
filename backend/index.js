import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import route from './routes/productsRoute.js'
import newsRoutes from './routes/newsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import DB from './Models/index.js'
import './helper/init_redis.js'
import {sequelize} from './helper/sequelize_config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'





dotenv.config()
const PORT=process.env.PORT || 3500
DB()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('upload'))
app.use(morgan('dev'))
app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
//     credentials:true
// }));



app.use('/api/products',route)
app.use('/api/news',newsRoutes)
app.use('/api/user',userRoutes)

app.use((req,res,next)=>{
    next(createError.NotFound("invalid Url or page is not found"))
})


app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.send(error)
})

sequelize.sync({alter:true}).then(

    app.listen(PORT,()=>{
        console.log(`Server is Running at ${PORT}`)
    })
)













