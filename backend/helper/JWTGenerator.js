import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import redisClient from './init_redis.js'

dotenv.config()
const accessTokenSecrate=process.env.ACCESS_TOKEN_SECRATE
const refreshTokenSecrate=process.env.REFRESH_TOKEN_SECRATE

export const AccessTokenGenerator=async(userId,username)=>{
    const accessToken=await jwt.sign(
        {username,userId},
        accessTokenSecrate,
        {'expiresIn':'1800s'})
    return accessToken
}

export const RefreshTokenGenerator=async(userId,username)=>{
    const refreshToken=await jwt.sign(
        {username,userId},
        refreshTokenSecrate,
        {'expiresIn':'2d'}
    )

    redisClient.set(userId,refreshToken)
    // console.log(refreshToken)
    return refreshToken
}
