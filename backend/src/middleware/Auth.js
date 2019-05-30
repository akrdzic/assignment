const jwt = require('express-jwt');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = jwt({
    secret: JWT_SECRET,
    credentialsRequired: false
});
