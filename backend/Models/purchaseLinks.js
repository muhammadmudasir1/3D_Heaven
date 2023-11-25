import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes, UUID } from "sequelize";

const purchaseLinks=sequelize.define("purchaseLinks",{
    purchaseLinksId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },

    siteName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    links:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
    },
    coupon:{
        type:DataTypes.STRING,
    },
    discription:{
        type:DataTypes.TEXT
    }
})

export default purchaseLinks;