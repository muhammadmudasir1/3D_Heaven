import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import CretaeError from 'http-errors'

dotenv.config()
const accessTokenSecrate = process.env.ACCESS_TOKEN_SECRATE

const verifyToken = (req, res, next) => {
    try {
        // console.log(req.headers)
        if (req.headers.authorization && req.headers.authorization.split(' '[0] === 'Bearer')){
            const accessToken = req.headers.authorization.split(' ')[1]
            const { username, userId } = jwt.verify(accessToken, accessTokenSecrate)
            req.username = username
            req.userId = userId
            console.log(req.userId)
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