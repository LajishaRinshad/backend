// Importing express inside your server
const express = require('express');

// Import mongoose inside your server
const mongoose = require('mongoose');

// Import body-parser inside your server
const bodyParser = require('body-parser');

// Import dotenv
require('dotenv').config();

// Import passport
const passport = require('passport');

// Import the strategies from passport & way to extract the jsonwebtoken
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Import cors
const cors = require('cors');

// The same secret in routes/ UserRoutes will be needed to read the jsonwebtoken
const secret = process.env.SECRET;

// We need the UsersModel to find the user in the database
const UsersModel = require('./models/UsersModel');

// Options for passport-jwt
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

// This function is what will read the contents (payload) of the jsonwebtoken
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy (
            passportJwtOptions,
            (jwtPayload, done) => {

                // Extract and find the user by their id (contained jwt)
                UsersModel.findOne ({_id: jwtPayload.id})
                .then(
                    // if document was found
                    (document) => {
                        return done (null, document)
                    }
                )
                .catch(
                    // If something went wrong
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
}


// Import routes
const ProductsRoutes = require('./routes/ProductsRoutes');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const EmailsRoutes = require('./routes/EmailsRoutes');

// This was done to know how to import datase models. This is not needed now since we imported them to the corresponding routes
// // Import database models
// const FeedsModel = require('./models/FeedsModel.js');
// const ProductsModel = require('./models/ProductsModel.js');
// const UsersModel = require('./models/UsersModel');

// Create the server object
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.use(passport.initialize());

server.use(cors());

// Invoke passportJwt and pass passport npm package as argument
passportJwt(passport);

// Enter your database connection url
const dbURL = process.env.DB_URL;

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser' : true,
        'useUnifiedTopology' : true
    }
).then(
    () => {
        console.log('You are connected to MongoDB');
        }

).catch(
    (e) => {
        console.log('catch', e);
    }
)

server.use(
    '/products',   // http://localhost:8080/products
    passport.authenticate('jwt', {session:false}), // Use passport-jwt to authenticate
    ProductsRoutes
);

server.use(
    '/feeds',
    passport.authenticate('jwt', {session: false}), // Use passport-jwt to authenticate
    FeedsRoutes
);

server.use(
    '/users',
    UsersRoutes
)

server.use(
    '/emails',
    EmailsRoutes
)


// Just for demo purpose, not required
// // A GET route for fetching data from the 'products' collection
// server.get(
//     '/products',
//     (req, res) => {

//         // (Step 1) Fetch all documents using .find()
//         ProductsModel.find()

//         // (Step 2) Once the results are ready, use .json() to send the results
//         .then(
//             (results) => {
//                 // res.json = res.send() + converts to JSON
//                 res.json(results)
//             }
//         )
//         .catch(
//             (e) => {
//                 console.log('error', e);
//             }
//         )
//     }
// )


// Was created for introduction
// // Create a route for the landing page
// server.get(
//     '/',
//     (req, res) => {
//         res.send(
//             "<h1>Welcome to somewebsite.com</h1><a href='/about'>About</a><br><a href='/contact'>Contact</a><br><a href='/products'>Products</a>"
//         )
//     }
// );

// // Create a route for the about page
// server.get(
//     '/about',
//     (req, res) => {
//         res.send("<h1>About Us</h1>")
//     }
// );

// // Create a route for the 404 page
// server.get(
//     '*',
//     (req, res) => {
//         res.send("<h1>404 Error</h1>")
//     }
// );


// Connect to port ( range 3000 - 9999 )
// http://127.0.0.1:8080 (aka http://localhost:8080)
server.listen( 
    process.env.PORT || 8080, () => {
    console.log('You are connected!  http://127.0.0.1:8080');
    }
)
