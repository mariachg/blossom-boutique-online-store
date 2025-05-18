const port = 4000
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors");

app.use(express.json()) // automatically passing through json any requests gotten from response
app.use(cors()) // the react.js project will connect to the express app on the 4000 port

// Connecting to the MongoDB Database  
mongoose.connect("mongodb://localhost:27017/e-commerce")

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Multer storage setup
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Upload Endpoint for the images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

app.post('/addproduct', async (req, res) => {
    //automatically update the id of newly added products
    let products = await Product.find({})
    let id;
    if (products.length > 0) {
        let lastProductArray = products.slice(-1)
        let lastProduct = lastProductArray[0]
        id = lastProduct.id + 1
    } else {
        id = 1
    }

    try {
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
        })
        console.log(product)
        await product.save();
        console.log("Saved")
        res.json({
            success: true,
            name: req.body.name
        })
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            message: "Server error while saving product"
        });
    }
})

// API creation for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name,
    })
})

//API creation for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products)
})

// Schema for the Users model
const Users = mongoose.model('Users', {
    //structure of the user
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true, //ensure that the users cannot create accounts with the same email 
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//Endpoint for User registration
app.post('/register', async (req, res) => {
    //checking existence of email
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: "User already exists" })
    }
    let cart = {}
    for (let index = 0; index < 300; index++) {
       cart[index] = 0
    }
    //creating user 
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    //saving the user in the database
    await user.save()
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })
})

// Endpoint for user Login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" })
        }
    }
    else {
        res.json({ success: false, errors: "Wrong email address" })
    }
})

//Endpoint for the New Arrivals products
app.get('/newarrivals', async (req, res) => {
    let products = await Product.find({})
    let newarrivals = products.slice(1).slice(-8)
    console.log("New Arrivals Fetched")
    res.send(newarrivals)
})

//Endpoint for Top Picks 
app.get('/toppicks', async (req, res) => {
    try {
        const products = await Product.find({
            category: { $in: ["clothes", "swimwear", "fragrances"] }
        })

        const top_products = products.slice(0, 4)
        console.log("Top Picks Fetched")
        res.send(top_products)
    } catch (error) {
        console.error("Error fetching top picks products", error)
        res.status(500).send("Internal Server Error")
    }
})

//middleware for getting users
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

//Endpoint for Adding Products in the Cart
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemid] += 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send({ message: "Item added" })
    console.log(req.body, req.user)
})

//Endpoint for Removing Products from the Cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Item Removed", req.body.itemid)
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemid] > 0)
        userData.cartData[req.body.itemid] -= 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.send({ message: "Item removed" })
})

//Endpoint for getting the cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('Get Cart')
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData)
})

//Endpoint for Checkout
app.post('/checkout', fetchUser, async (req, res) => {
    let emptyCart = {}
    for (let index = 0; index < 300; index++) {
        emptyCart[index] = 0
    }
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: emptyCart }
    )
    res.send({ message: "Checkout completed" })
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running on Port " + port)
    }
    else {
        console.log("Error:" + error)
    }
})


