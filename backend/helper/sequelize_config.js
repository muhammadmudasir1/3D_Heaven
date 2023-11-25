import { Sequelize } from "sequelize";

// export const sequelize=new Sequelize({
//     dialect:"postgres",
//     host: process.env.DATABASE_HOST,
//     post: process.env.DATABASE_PORT,
//     username: "postgres",
//     password:"pgadmin",
//     database: process.env.DATABASE_NAME
// })

    export const sequelize = new Sequelize( "3D_Heaven",'postgres', 'pgadmin', {
  host: 'localhost',
  dialect: 'postgres',
});

// module.exports = { sequelize };





export const connectDatabase =()=>{
        sequelize.authenticate().then((result)=>
            console.log(`Database is coneected`)
        )
        .catch((error)=>{
            console.log(`Database is not connecting ${error}`)})
}





