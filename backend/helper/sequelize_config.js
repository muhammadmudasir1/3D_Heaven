import { Sequelize } from "sequelize";

<<<<<<< HEAD
  export const sequelize = new Sequelize( "postgres",'postgres', 'postgres', {
=======
    export const sequelize = new Sequelize( "postgres",'postgres', 'postgres', {
>>>>>>> 110711e3c82c9159831fc42485f91e444bcef648
  host: 'localhost',
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