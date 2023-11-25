import Product from "./Product.js";
import Product_Type from "./Product_Type.js";
import ProductVariant from "./ProductVarient.js";
import FDM_specs from "./FDM_specs.js";
import SLA_specs from "./SLA_specs.js";
import LeaserCutter_specs from "./leaserCutter.js";
import Scanner_specs from "./Scanner_specs.js";
import purchaseLinks from "./purchaseLinks.js";

const DB =()=>{
    const Models={
        Product,
        Product_Type,
        FDM_specs,
        SLA_specs,
        LeaserCutter_specs,
        Scanner_specs,
        purchaseLinks
        
    }
    Product.belongsTo(Product_Type, {
        foreignKey: 'product_Type_Id',
        as: 'productType'
      });
    purchaseLinks.hasOne(Product,{
        foreignKey:'product',
        allowNull:false
    })

    // FDM_specs.belongsTo(Product,{
    //     foreignKey:"product"
    // })
    // SLA_specs.belongsTo(Product,{
    //     foreignKey:'product'
    // })

    // Scanner_specs.belongsTo(Product,{
    //     foreignKey:'product'
    // })
    // LeaserCutter_specs.belongsTo(Product,{
    //     foreignKey:'product'
    // })
    Product.hasOne(FDM_specs,{
        foreignKey:"product",
        allowNull:false
    })
    Product.hasOne(SLA_specs,{
        foreignKey:"product",
        allowNull:false
    })
    Product.hasOne(Scanner_specs,{
        foreignKey:"product",
        allowNull:false
    })
    Product.hasOne(LeaserCutter_specs,{
        foreignKey:"product",
        allowNull:false
    })
    
    
    Product.belongsToMany(Product, { as: 'variants', through: ProductVariant, foreignKey: 'productId' });
    Product.belongsToMany(Product, { as: 'parents', through: ProductVariant, foreignKey: 'variantId' });
      
}
export default DB