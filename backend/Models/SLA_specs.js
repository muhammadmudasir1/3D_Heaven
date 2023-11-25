import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const SLA_specs=sequelize.define('SLA',{
    installationSpace:{
        type:DataTypes.STRING
    },
    monoscreen:{
        type:DataTypes.STRING
    },
    pixelResolution:{
        type:DataTypes.STRING
    },
    XYPixelResolution:{
        type:DataTypes.STRING
    },
    ZAxis:{
        type:DataTypes.STRING
    },
    ZAxisResolution:{
        type:DataTypes.STRING
    },
    platform:{
        type:DataTypes.STRING
    },
    touchScreen:{
        type:DataTypes.STRING
    },
    printSpeed:{
        type:DataTypes.STRING
    },
    lightTechnology:{
        type:DataTypes.STRING
    },
    lightDensity:{
        type:DataTypes.STRING
    },
    airPurificationSystem:{
        type:DataTypes.STRING
    },
    interface:{
        type:DataTypes.STRING
    },
    buildSize:{
        type:DataTypes.STRING
    } 
})

export default SLA_specs