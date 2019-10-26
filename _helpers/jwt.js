const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../app/service/user.service');
const jsonwebtoken = require('jsonwebtoken');
const db = require('../app/model');
const User = db.User;

module.exports = {
    jwt,
    Authorization
};

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/graphql'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

async function Authorization(req, res, next){

    try {            
        req.user = await userService.getById(req.user.sub);
    } catch (e) { req.user = null; }    

    next();    
}

