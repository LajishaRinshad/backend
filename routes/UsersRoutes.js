const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "1s2c3r4t5";

const UsersModel = require('../models/UsersModel');

// /register
router.post(
    '/register',  // http://localhost:8080/users/register
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        // * * * Password Encryption * * * //

        // Step 1: Generate a salt
        bcrypt.genSalt (
            (err, salt) => {

                // Step 2: Generate a hash
                bcrypt.hash(
                    formData.password, // first ingredient
                    salt, // second ingredient
                    (err, hashedPassword) => {

                        const newUsersModel = new UsersModel(formData);

                        // Step 3: Replace the original password with hash
                        newUsersModel.password = hashedPassword;

                        // Step 4: Save user data to database (with encryted password)

                        newUsersModel.save(
                            (err, dbResult) => {

                                // If something goes wrong, send error
                                if(err) {
                                    res.send(err)
                                } 
                                // Otherwise, send success message
                                else {
                                    res.send('User has been saved!')
                                }
                            }
                        );
                    }
                )
            }
        )

    } 
);

// /login

router.post(
    '/login',
    (req, res) => {

        // npm packages: passport, passport-jwt, json webtoken
        
        // Step 1. Capture formData (email & password)

        const formData = {
            email: req.body.email,
            password: req.body.password
        }

        // Step 2a. In database, find the account that matches the email

        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {

                // Step 2b. If email doesn't match, reject the login request

                if (!document) {
                    res.send ("Please check email or password")
                }

                // Step 3. If there's matching email, examine the document's password

                else{

                    // Step 4. Compare the encrypted password in db with the incoming password

                    bcrypt.compare(formData.password, document.password)
                    .then(
                        (isMatch) => {

                             // Step 5a. If the password matches, generate web token (JWT- Javascript Web Token)

                            if (isMatch) {

                                // Step 6. Send the JWT to the client 

                                const payload = {
                                    id: document.id,
                                    email: document.email
                                }

                                jwt.sign (
                                    payload,
                                    secret,
                                    (err, jsonwebtoken) => {
                                        res.send(
                                            {
                                                msg: 'Login successful',
                                                jsonwebtoken: jsonwebtoken
                                        
                                            }
                                        )
                                    }
                                )

                            }

                            // Step 5b. If password doesn't match, reject the login request

                            else {
                                res.send ("Please check email or password")
                            }

                        }
                    )
                }

            }
        )
    }
)

module.exports = router;