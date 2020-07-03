// import mongoose
const mongoose = require ('mongoose');

const FeedsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        hashtags: {
            type: Array
        },
        image: {
            type: String
        },
        likes: {
            type: Array
        },
        profilePicture: {
            type: String,
            default: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg' 
            // to give a default image if user doesn't give it
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const FeedsModel = mongoose.model('feeds', FeedsSchema);
module.exports = FeedsModel;
