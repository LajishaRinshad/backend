// import mongoose
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
    { 
        brand: {
        type: String,
        required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }
);

const ProductsModel = mongoose.model('products', ProductsSchema);
module.exports = ProductsModel;