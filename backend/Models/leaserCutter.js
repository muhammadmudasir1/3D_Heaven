import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const LeaserCutter_specs=sequelize.define("LeaserCutter",{
    laserPower:{
        type:DataTypes.STRING
    },
    laserWavelength:{
        type:DataTypes.STRING
    },
    workSurface:{
        type:DataTypes.STRING
    },
    machineWeight:{
        type:DataTypes.STRING
    },
    guides:{
        type:DataTypes.STRING
    },
    laserOpticalOutputPower:{
        type:DataTypes.STRING
    },
    pinpointAccuracy:{
        type:DataTypes.STRING
    },
    airAssist:{
        type:DataTypes.STRING
    },
    possibleCuttingStrengths:{
        type:DataTypes.STRING
    },
    possibleEngravingMaterials:{
        type:DataTypes.STRING
    },
    possibleCuttingThicknesses:{
        type:DataTypes.STRING
    },
    securityFeatures:{
        type:DataTypes.STRING
    },
    engravingAccuracy:{
        type:DataTypes.STRING
    },
    engravingArea:{
        type:DataTypes.STRING
    },
    focusingMethod:{
        type:DataTypes.STRING
    },
    airAssistCompressor:{
        type:DataTypes.STRING
    },
    interface:{
        type:DataTypes.STRING
    },
    powerSupplyOutputPower:{
        type:DataTypes.STRING
    },
    laserSoftware:{
        type:DataTypes.STRING
    },
    engravingMaterial:{
        type:DataTypes.STRING
    },
    cuttingMaterial:{
        type:DataTypes.STRING
    },
    workingArea:{
        type:DataTypes.STRING
    },
})

export default LeaserCutter_specs