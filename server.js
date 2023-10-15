const express = require('express')
const app = express()

//routes

app.get('/', (req, res) => {
    res.send({"message" : 'Welcome to DressStore application'})
})

app.listen(3000,()=> {
    console.log('Marketplace app is running on port 3000')
})