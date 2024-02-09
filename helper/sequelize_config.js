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
  logging:false
});
// export const sequelize = new Sequelize("postgresql://mudasir:IyDUngSNgFe8lEhtdLF7KA@cloud-wyvern-7338.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",{
//   host: 'pg-3b1a190d-mudasirabbasi26-73b5.a.aivencloud.com',
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }}
// });





export const connectDatabase =()=>{
        sequelize.authenticate().then((result)=>
            console.log(`Database is coneected`)
        )
        .catch((error)=>{
            console.log(`Database is not connecting ${error}`)})
}





