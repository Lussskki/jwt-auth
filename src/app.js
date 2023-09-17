//server
import express from 'express'
const app = express()

//development, auth
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
// import auth from './middleware/auth.js'
import users from './users.js'
import fs from 'fs'

//development 
app.use(bodyParser.json())
import dotenv from 'dotenv' 
      dotenv.config()
const TOKEN_PASS = process.env.TOKEN_PASS      
//db
const myData = JSON.parse(fs.readFileSync('src/db/db.json').toString())


//Post: login method
app.post('/login', (req, res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        const token = jwt.sign({ username,password,TOKEN_PASS }, TOKEN_PASS, { expiresIn: '1h' })
        myData.push(req.body)
        fs.writeFileSync('src/db/db.json',JSON.stringify(myData))
        if(myData){ return res.json(`Added successfully and token: ${token}`)}
        
    } else {
        res.status(401).json({ message: 'Authentication failed' })
    }

})
//Get: http method
app.get('/',(req,res)=>{
    res.send(myData)
})



app.listen(3000,()=>{
    console.log(`Listens on a port`)
})