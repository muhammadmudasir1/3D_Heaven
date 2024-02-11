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
                msg: "invalid Role"
            },
            min: {
                args: [1],
                msg: "invalid Role"
            },
            max: {
                args: [3],
                msg: "invalid Role"
            }
        }
    }
})

export default User