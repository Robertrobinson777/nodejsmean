require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { jwt, Authorization } = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const expressValidator = require('express-validator');
const graphqlExpress = require("express-graphql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// validate request input's
app.use(expressValidator());

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// put authorized user's information in header
app.use(Authorization);

// api routes
app.use('/users', require('./app/controller/users.controller'));
//app.use('/products', require('./app/controller/products.controller'));
const {productSchema} = require('./app/controller/products.controller');
//
app.use('/graphql', graphqlExpress({
    schema: productSchema,
    rootValue: global,
    graphiql: true
}));
//
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});