import Product from "./Product.js";
import ProductVariant from "./ProductVarient.js";
import FDM_specs from "./FDM_specs.js";
import SLA_specs from "./SLA_specs.js";
import LeaserCutter_specs from "./leaserCutter.js";
import Scanner_specs from "./Scanner_specs.js";
import purchaseLinks from "./purchaseLinks.js";
import User from "./User.js";
import ProductImages from "./productImages.js";
import Review from "./Review.js";
import newsLetter from "./newsLetter.js";

const DB =()=>{
    const Models={
        Product,
        FDM_specs,
        SLA_specs,
        LeaserCutter_specs,
        Scanner_specs,
        purchaseLinks,
        User,
        ProductImages,
        Review,
        newsLetter
    };

    Product.hasMany(purchaseLinks,{
        foreignKey:"product",
        allowNull:false,
        unique:true,
        onDelete:'CASCADE'
    })

    Product.hasOne(FDM_specs,{
        foreignKey:"product",
        allowNull:false,
        unique:true,
        onDelete:'CASCADE'
    })
    Product.hasOne(SLA_specs,{
        foreignKey:"product",
        allowNull:false,
        unique:true,
        onDelete:'CASCADE'
    })

    Product.hasOne(Scanner_specs,{
        foreignKey:"product",
        allowNull:false,
        unique:true,
        onDelete:'CASCADE'
    })
    Product.hasOne(LeaserCutter_specs,{
        foreignKey:"product",
        allowNull:false,

        unique:true,
        onDelete:'CASCADE'
    })
    Product.hasOne(Review,{
        foreignKey:"product",
        allowNull:true
    })
    Product.hasMany(ProductImages,{
        allowNull:false,
        onDelete:'CASCADE'
    })
    
    
    Product.belongsToMany(Product, { as: 'variants', through: ProductVariant, foreignKey: 'productId' });
    Product.belongsToMany(Product, { as: 'parents', through: ProductVariant, foreignKey: 'variantId' });
      
}
export default DB