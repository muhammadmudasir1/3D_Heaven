import  express from "express";
// import productRoutes from "./routes/productRoutes.js";
import "./helper/DB_Connect.js"
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";


const app=express();

app.use(express.json())
app.use(morgan('dev'))



app.use('/products',productRoutes)

app.listen(3000)
