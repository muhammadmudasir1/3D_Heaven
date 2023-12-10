import { sequelize } from "../helper/sequelize_config.js";
import { DataTypes, UUIDV4 } from "sequelize";


const User=sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    role:{
        type:DataTypes.SMALLINT,
        allowNull:false,
        validate: {
            isInt: {
                msg: "must be integer"
            },
            min: {
                args: [1],
                msg: "Value must be positive"
            },
            max: {
                args: [2],
                msg: "Value is smaller or equal to 5"
            }
        }
    }
})

export default User