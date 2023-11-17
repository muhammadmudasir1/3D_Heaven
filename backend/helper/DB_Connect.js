import pg from "pg";
const {Client}=pg

const client = new Client(
    {
        user:"postgres",
        host:"localhost",
        database:"3D_Heaven",
        password:"pgadmin",
        port:5432
    }
)
const connectToDB=async ()=>{
    try {
        client.connect()
        console.log("db is connected")
        return client
    } catch (error) {
        console.log("DB is not connecting")
        console.log(error)
    }
}


export default connectToDB