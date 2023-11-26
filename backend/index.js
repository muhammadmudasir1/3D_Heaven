import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import route from './routes/productsRoute.js'
import DB from './Models/index.js'
import {connectDatabase, sequelize} from './helper/sequelize_config.js'



dotenv.config()
const PORT=process.env.PORT || 3500
DB()
const app = express()
app.use(express.json())
app.use(express.static('upload'))
app.use(morgan('dev'))

app.use('/products',route)



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













