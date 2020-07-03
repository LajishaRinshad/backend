// Import express into the file
const express = require('express');

// Invoke the router()
const router = express.Router();

// Import the model
const FeedsModel = require('../models/FeedsModel');

// A POST route for saving data into the 'feeds' collection
router.post(
    '/',
    (req, res) => {

        // Read the 'Body' within POST request
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image
        };
        // console.log(
        //     'From the user', formData
        // );

        // Save the data to database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received')
    }   
);

router.post(
    '/likessss',
    (req, res) => {

        const formData = {
            likes: req.body.likes
        }
        // Use FeedsModel to find the user
        FeedsModel.find ( 
            { email: 'rinshad@gmail.com' },           
            function ( err, document ) {}                          
        )

        // Update the likes array
        const newLikesArray = new FeedsModel(likes);
        FeedsModel.updateOne({ email: 'rinshad@gmail.com' }, { likes: newLikesArray});
    }
)

// A GET route for fetching data from the 'feeds' collection
router.get(
    '/',
    (req, res) => {

        // (Step 1) Fetch all documents using .find()
        FeedsModel.find()

        // (Step 2) Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                // res.json = res.send() + converts to JSON
                res.json(results)
            }
        )
        .catch(
            (e) => {
                console.log('error occured', e);
            }
        )
    }
);

// Export the router
module.exports = router;