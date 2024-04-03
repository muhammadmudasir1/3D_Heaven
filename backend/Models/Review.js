import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const Review=sequelize.define("review",{
    pros:{
        type:DataTypes.TEXT
    },
    cons:{
        type:DataTypes.TEXT
    },
    seoKeys:{
        type:DataTypes.TEXT
    },
    review:{
        type:DataTypes.TEXT
    },
    isImprint:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isDataProtection:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
    
})

export default Review