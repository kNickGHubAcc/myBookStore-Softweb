const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const products = require("./dummyProducts");
const routes = require('./routes/routes');
const productsRoute = require('./routes/products');
const orders = require("./routes/orders");
const stripe = require('./routes/stripe');
const users = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();


app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(cors());
app.use(routes);
app.use("/api/orders", orders);
app.use('/api/stripe', stripe);
app.use("/api/products", productsRoute);
app.use("/api/users", users);


app.get('/', (req, res) => {res.send("Welcome");})
app.get('/products', (req, res) =>{res.send(products);})


/*--------------------Σύνδεση με MongoDB-------------------*/
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));
/*---------------------------------------------------------*/

app.listen(port, console.log(`\nServer is running on port ${port}...`))