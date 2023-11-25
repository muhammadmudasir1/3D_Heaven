import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const Scanner_specs=sequelize.define('scanner',{
    scanningPrecision:{
        type:DataTypes.STRING
    },
    scanAccuracy:{
        type:DataTypes.STRING
    },
    scanningArea:{
        type:DataTypes.STRING
    },
    scanningDistance:{
        type:DataTypes.STRING
    },
    scanSpeed:{
        type:DataTypes.STRING
    },
    objectDimension_handScan:{
        type:DataTypes.STRING
    },
    objectDimension_turnTable:{
        type:DataTypes.STRING
    },
    lightSource:{
        type:DataTypes.STRING
    },
    camera:{
        type:DataTypes.STRING
    },
    standardPackage:{
        type:DataTypes.STRING
    },
    premiumPackage:{
        type:DataTypes.STRING
    },
    scanMinimumSize:{
        type:DataTypes.STRING
    },
    scanQuality:{
        type:DataTypes.STRING
    },
    scanMaximumSize:{
        type:DataTypes.STRING
    }
})

export default Scanner_specs