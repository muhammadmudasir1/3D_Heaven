import Product from "./Product.js";
import ProductVariant from "./ProductVarient.js";
import FDM_specs from "./FDM_specs.js";
import SLA_specs from "./SLA_specs.js";
import LeaserCutter_specs from "./leaserCutter.js";
import Scanner_specs from "./Scanner_specs.js";
import purchaseLinks from "./purchaseLinks.js";

const DB =()=>{
    const Models={
        Product,
        FDM_specs,
        SLA_specs,
        LeaserCutter_specs,
        Scanner_specs,
        purchaseLinks
        
    };

    purchaseLinks.hasOne(Product,{
        foreignKey:'product',
        allowNull:false
    })
    Product.hasOne(FDM_specs,{
        foreignKey:"product",
        allowNull:false
    })
    Product.hasOne(SLA_specs,{
        foreignKey:"product",
        allowNull:false,
        unique:true
    })

    Product.hasOne(Scanner_specs,{
        foreignKey:"product",
        allowNull:false,
        unique:true
    })
    Product.hasOne(LeaserCutter_specs,{
        foreignKey:"product",
        allowNull:false
    })
    
    
    Product.belongsToMany(Product, { as: 'variants', through: ProductVariant, foreignKey: 'productId' });
    Product.belongsToMany(Product, { as: 'parents', through: ProductVariant, foreignKey: 'variantId' });
      
}
export default DB