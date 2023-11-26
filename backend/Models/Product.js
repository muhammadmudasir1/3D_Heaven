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
    weight: {
        type: DataTypes.STRING,
        allowNull: true
    },
    diemention: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price_rating: {
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer"
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
                msg: "must be integer"
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
                msg: "must be integer"
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
                msg: "must be integer"
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
                msg: "must be integer"
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
        type: DataTypes.SMALLINT,
        validate: {
            isInt: {
                msg: "must be integer"
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
    pros: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cons: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    technical_data: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    first_impression: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false

    },
    scope_of_delivery_discription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    scope_of_delivery_images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
                msg: "must be integer"
            },
            min: {
                args: [1],
                msg: "invalid Product Type"
            },
            max: {
                args: [4],
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
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: "must be integer"
            },
            min: {
                args: [0],
                msg: "Value must be positive"
            },
        },
    }


}
)


export default Product
