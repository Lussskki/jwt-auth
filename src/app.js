//server
import express from 'express'
const app = express()

//development, auth
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import auth from './middleware/auth.js'
import users from './users.js'

//development 
app.use(bodyParser.json())
import dotenv from 'dotenv' 
      dotenv.config()
const TOKEN_PASS = process.env.TOKEN_PASS      



//Post: login method
app.post('/login', auth, (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
        const token = jwt.sign({ username }, TOKEN_PASS, { expiresIn: '1h' })
        res.json({ token })
    } else {
        res.status(401).json({ message: 'Authentication failed' })
    }
})



app.listen(3000,()=>{
    console.log(`Listens on a port`)
})