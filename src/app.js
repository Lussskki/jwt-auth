//server
import express from 'express'
const app = express()

//development, auth
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import auth from './middleware/auth.js'

//development
app.use(bodyParser.json())
import dotenv from 'dotenv'
      dotenv.config()
const TOKEN_PASS = process.env.TOKEN_PASS      


const users = [
    {id: 1, username: 'user1', password: 'password1' },
    {id: 2, username: 'user2', password: 'password2'}
]
//Post: login method
app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
  
    if (user) {
      const token = jwt.sign({ userId: user.id }, TOKEN_PASS)
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Authentication failed' })
    }
  })
  


app.listen(3000,()=>{
    console.log(`Listens on a port`)
})