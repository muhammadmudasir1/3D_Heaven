import { DataTypes } from "sequelize";
import { sequelize } from "../helper/sequelize_config.js";


const Product = sequelize.define("Product", {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer Price"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    innovation_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer Innovation"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    software_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer software"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    customer_service_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer customer"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    processing_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer processing"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    overall_rating: {
        type: DataTypes.FLOAT,
        validate: {
            isInt: {
                msg: "must be integer overall"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
            max: {
                args: [5],
                msg: "Value is smaller or equal to 5"
            }
        }
    },
    scope_of_delivery_discription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    include_in_BestDeals: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    productType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "must be integer ProductType"
            },
            min: {
                args: [1],
                msg: "invalid Product Type"
            },
            max: {
                args: [5],
                msg: "invalid Product Type"
            }
        }
    },
    discription: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT
    },
    unit:{
        type:DataTypes.STRING
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
}
)


export default Product
