import { sequelize } from "../helper/sequelize_config.js"
import { DataTypes } from "sequelize"

const Product_Type=sequelize.define("Product_Type",{
    Id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Name:{
        type:DataTypes.STRING,
        unique:true
    }
})
export default Product_Type