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
    image:{
        type:DataTypes.STRING,
    }
})

export default beginnersGuid