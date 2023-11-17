import { Sequelize } from "sequelize";

export const sequelize=new Sequelize({
    dialect:"postgres",
    host: process.env.DATABASE_HOST,
    post: process.env.DATABASE_PORT,
    username: "postgres",
    password:"pgadmin",
    database: process.env.DATABASE_NAME
})




export const connectDatabase = async ()=>{
    try {
        await sequelize.authenticate()
        console.log("Database is connected")
    } catch (error) {
        console.log(`Database is not connecting ${error}`)
        
    }

}

