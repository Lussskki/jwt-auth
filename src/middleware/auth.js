//router
import express from 'express'
const router = express.Router()

//development
import dotenv from 'dotenv'
      dotenv.config()
const TOKEN_PASS = process.env.TOKEN_PASS 

//function
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' })
    }
  
    jwt.verify(token, TOKEN_PASS, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      }
      req.userId = decoded.userId
      next()
    })
  }


  export default verifyToken