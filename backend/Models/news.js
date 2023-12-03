import { DataTypes } from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const news=sequelize.define("news",{
    newsId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    Title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
    }
})

export default news