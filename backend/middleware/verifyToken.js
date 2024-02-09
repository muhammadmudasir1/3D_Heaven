import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import CretaeError from 'http-errors'

dotenv.config()
const accessTokenSecrate = process.env.ACCESS_TOKEN_SECRATE

const verifyToken = (req, res, next) => {
    try {

        if (req.headers.authorization && req.headers.authorization.split(' '[0] === 'Bearer')){
            const accessToken = req.headers.authorization.split(' ')[1]
            console.log(" ")
            console.log("from refresh Token")
            console.log(accessToken)
            console.log(" ")
            const { username, userId } = jwt.verify(accessToken, accessTokenSecrate)
            req.username = username
            req.userId = userId
            next()
        }
        else{
            throw new Error("Req does not have any token")
        }
        
    } catch (error) {
        console.log("from varifyToken  " + error)
        next(CretaeError.Forbidden("Invalid Token or Expired"))
    }
}
export default verifyToken