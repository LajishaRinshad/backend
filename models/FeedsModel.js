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
        profilePicture: {
            type: String,
            // to give a default image if user doesn't give it
            // default: 'http://....'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const FeedsModel = mongoose.model('feeds', FeedsSchema);
module.exports = FeedsModel;
