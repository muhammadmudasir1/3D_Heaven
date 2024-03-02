import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes, UUID } from "sequelize";

const purchaseLinks = sequelize.define("purchaseLinks", {
    purchaseLinksId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    siteType: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    siteName: {
        type: DataTypes.STRING
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    visitingLink:{
        type: DataTypes.TEXT,
        // allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    coupon: {
        type: DataTypes.STRING,
    },
    discription: {
        type: DataTypes.TEXT
    },
    discountedPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    originalPrice: {
        type: DataTypes.FLOAT,
    },
    unit:{
        type:DataTypes.STRING,
        allowNull:false
    },

    retrivePriceFlag:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},
    {
        timestamps: true
    }
)

export default purchaseLinks;