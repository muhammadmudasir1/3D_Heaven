import DB_Connect from "../helper/DB_Connect.js";


const db=await DB_Connect();

export const getAllProducts=async(req,res,next)=>{
    db.query("select * from products", (err,result)=>{
        res.send(result.rows)
    })
}


export const addProduct = async (req,res,next)=>{
    const product_images =req.files.map((item)=>{
        return item.filename
    })
    const data ={
        'product_name':req.body.name,
        'product_category':req.body.category,
        product_images
    }

    const insertQuery={
        text:"INSERT INTO products(product_name,product_category,product_images) VALUES($1,$2,$3)",
        values:[
            req.body.name,
            req.body.category,
            product_images
        ]
    }    

    db.query(insertQuery,(err,result)=>{
        if (err) {
            res.send(err)
            console.log(err)
        }
        res.send(result)
    })
}