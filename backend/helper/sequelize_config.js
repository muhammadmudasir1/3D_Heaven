import { Sequelize } from "sequelize";

    export const sequelize = new Sequelize( "postgres",'postgres', 'postgres', {
  host: 'postgres',
  dialect: 'postgres',
  logging:false
});

export const connectDatabase =()=>{
        sequelize.authenticate().then((result)=>
            console.log(`Database is coneected`)
        )
        .catch((error)=>{
            console.log(`Database is not connecting ${error}`)})
}