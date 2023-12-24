import { DataTypes } from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const ProductImages=sequelize.define('ProductImages',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    path:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate: {
            isInt: {
                msg: "must be integer"
            },
            min: {
                args: [1],
                msg: "Value must be positive"
            },
            max: {
                args: [3],
                msg: "Value is smaller or equal to 3"
            }
        }
    }
})

export default ProductImages