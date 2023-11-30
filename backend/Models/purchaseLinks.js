import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes, UUID } from "sequelize";

const purchaseLinks = sequelize.define("purchaseLinks", {
    purchaseLinksId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    siteName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    links: {
        type: DataTypes.STRING,
        allowNull: false,
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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},
    {
        timestamps: false
    }
)

export default purchaseLinks;