// import mongoose
const mongoose = require ('mongoose');

const EmailsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const EmailsModel = mongoose.model('emails', EmailsSchema);
module.exports = EmailsModel;
