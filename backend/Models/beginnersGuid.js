import { DataTypes } from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const beginnersGuid=sequelize.define("beginnersGuid",{
    guidId:{
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
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    image:{
        type:DataTypes.STRING,
    }
})

export default beginnersGuid