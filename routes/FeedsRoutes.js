// Import express into the file
const express = require('express');
const mongoose = require('mongoose');


// Invoke the router()
const router = express.Router();

// Import the model
const FeedsModel = require('../models/FeedsModel');
const UsersModel = require('../models/UsersModel');
const { Mongoose } = require('mongoose');

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
    '/likes',
    (req, res) => {

        const formData = {
            feedId: req.body.feedId,
            userId: req.body.userId,
        };

        // Use FeedsModel to find the feed
        FeedsModel.findOne ( 
            { "_id": formData.feedId },           
            function ( err, foundFeed ) {

                if (err) {

                    console.log(err);

                } else {

                    // If the feed id is not found, show the error message
                    if (!foundFeed) {

                        res.send("Feed not found");

                    } else {

                    // If the feed is found, check if the user id is in the likes array

                    FeedsModel.findOne( 
                        { "likes": formData.userId },
                        function ( err, foundUser ) {

                            if (err) {
            
                                console.log(err);
            
                            } else {
            
                                // If the user id is not found
                                if (!foundUser) {

                                    FeedsModel.update(
                                        {"_id" : mongoose.Types.ObjectId(formData.feedId)},
                                        {$push: { "likes" : [mongoose.Types.ObjectId(formData.userId)]}},
                                        (err, res) => {
                                            if (err) {
                                                console.log("not updated")
                                            }
                                            else{
                                               console.log("Updated");
                                            }
                                        }
                                    );
            
                                } 
                                else {

                                    // If the user id is found
                                    FeedsModel.update(
                                        {"_id" : mongoose.Types.ObjectId(formData.feedId)},
                                        {$pull: { "likes" : [mongoose.Types.ObjectId(formData.userId)]}},
                                        (err, res) => {
                                            if (err) {
                                                console.log("not updated")
                                            }
                                            else{
                                               console.log("Updated");
                                            }
                                        }
                                    );
                                }    

                            }
                        }
                    ) 
                        
                    
                }
                    
                    res.send('Feed has been updated!')
        
                }

                    
            }                          
        )      
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