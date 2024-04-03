import { DataTypes } from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const newsLetter=sequelize.define("newsLetter",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default newsLetter