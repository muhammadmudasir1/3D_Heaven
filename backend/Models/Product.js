import {DataTypes} from "sequelize";
import {sequelize} from "../helper/sequelize_config.js"


const Product=sequelize.define("Products",{
    Id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    manufacturer:{
        type:DataTypes.STRING,
        allowNull:false
    },
    weight:{
        type:DataTypes.STRING,
        allowNull:true
    },
    diemention:{
        type:DataTypes.STRING,
        allowNull:true
    },
    price_rating:{
        type:DataTypes.SMALLINT,
        validate:{
            isInt:{
                msg:"must be integer"
            },
            min:{
                args:[0],
                msg:"Value must be positive"
            },
            max:{
                args:[5],
                msg:"Value is smaller or equal to 5"
            }
        }
    },
    innovation_rating:{
        type:DataTypes.SMALLINT
    }
})

sequelize.sync()
.then(console.log("table is created or updated"))
.catch(console.log(`table is not created or updated ${console.error()}`))