import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const Review=sequelize.define("review",{
    pros:{
        type:DataTypes.STRING
    },
    cons:{
        type:DataTypes.STRING
    },
    review:{
        type:DataTypes.TEXT
    },
    
})

export default Review