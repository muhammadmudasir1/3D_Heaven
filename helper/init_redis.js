import {createClient} from 'redis'

const client=createClient({
    port:6379,
    host:"127.0.0.1"
})
client.on('connect',()=>{
    console.log("Redis is connected")
})

client.on('error',(error)=>{
    console.log(error)
})
await client.connect()

export default client
