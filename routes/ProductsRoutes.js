// Import express into the file
const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');


// POST route for creating product
router.post(
    '/',
    (req, res)=>{
        // Capture the form data
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            qty: req.body.qty,
            image: req.body.image,
            description: req.body.description
        }

        // Instantiate the ProductsModel
        const newProductsModel = ProductsModel(formData);
        newProductsModel.save();

        res.send('Product has been saved!');
    }
);


// POST route to update product
router.post(
    '/update',
    (req, res) => {
        const formData = {
            qty: req.body.qty,
            _id: req.body._id
        };

        ProductsModel
        .findOneAndUpdate(
            { _id: formData._id }, // search criteria
            { qty: formData.qty }, // the keys & values to update
            {}, // options (if any)
            (err, document) => {

                if(err) {
                    console.log(err);
                } else {
                    res.json(
                        {
                            message: 'Product updated',
                            document: document
                        }
                    )
                }
            }
        )
    }
);

// A GET route for fetching data from the 'feeds' collection
router.get(
    '/',
    (req, res)=>{

        // (1) Fetch all the documents using .find()
        ProductsModel.find()

        // (2) Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                // res.json = res.send() + converts to JSON
                res.json({products: results})
            }
        )
        .catch( 
            (e)=> {
                console.log('error occured', e)
            }
        );

    }
);

// Export the router
module.exports = router