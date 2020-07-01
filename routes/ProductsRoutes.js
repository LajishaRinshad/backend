// Import express into the file
const express = require('express');

// Invoke the router()
const router = express.Router();

// Import the ProductsModel
const ProductsModel = require('../models/ProductsModel');

// A POST route for saving data into the 'products' collection
router.post(
    '/',  // http://localhost:8080/products
    (req, res) => {

        // Capture the form data
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            qty: req.body.qty
        }
        
        // Instantiate the ProductsModel
        const newProductsModel = new ProductsModel(formData);
        newProductsModel.save();

        res.send('Products POST received')
    }   
)

// Export the router
module.exports = router;