'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(userId, email) {
    const jwtOptions = {
        expiresIn: '7d'
    };
    return jwt.sign({ userId, email }, JWT_SECRET, jwtOptions);
}

module.exports = {
    generateAccessToken
};
