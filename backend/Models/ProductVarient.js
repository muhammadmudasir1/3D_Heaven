import {DataTypes} from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const ProductVariant=sequelize.define("ProductVarient",{
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      variantId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
})
export default ProductVariant