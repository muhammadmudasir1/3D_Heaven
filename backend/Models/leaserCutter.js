import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes } from "sequelize";

const LeaserCutter_specs=sequelize.define("LeaserCutter",{
    laserPower:{
        type:DataTypes.STRING
    },
    laserWavelength:{
        type:DataTypes.STRING
    },
    engravingAccuracy:{
        type:DataTypes.STRING
    },
    engravingArea:{
        type:DataTypes.STRING
    },
    foucingMethod:{
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
    airAssist:{
        type:DataTypes.STRING
    },
    workingArea:{
        type:DataTypes.STRING
    },
})

export default LeaserCutter_specs