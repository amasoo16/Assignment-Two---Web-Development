const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to DressStore application' })
})

app.get('/welcome', (req, res) => {
    res.send({ message: 'Welcome to DressStore application' })
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// updating a product

//delete a product
app.delete('/products/:id', async(req,res) => {
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/search/:query', async (req, res) => {
    try {
        const searchQuery = req.params.query; 
        const products = await Product.find({ name: { $regex: new RegExp(searchQuery, "i") } });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://amasoo16:pezcF7xhzI8rUbOB@cluster0.elp18ug.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000, () => {
            console.log('Marketplace app is running on port 3000')
        })
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error)
    })

    
