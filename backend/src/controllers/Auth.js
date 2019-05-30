'use strict';

const authService = require('../lib/services/Auth');

async function login(req, res, next) {
    try {

        const { email, password } = req.body;
        const response = await authService.login(email, password);

        res.status(200).send(response);

    } catch(e) {
        next(e);
    }
}

async function register(req, res, next) {
    try {

        const { firstName, lastName, email, password } = req.body;

        const response = await authService.register(firstName, lastName, email, password);

        res.status(200).send(response);

    } catch(e) {
        next(e);
    }
}

function validateToken(req, res, next) {
    const user = req.user;

    res.status(200).send({
        userId: user.userId,
        email: user.email,
        token: req.headers.authorization.split(' ')[1],
    });
}

module.exports = {
    login,
    register,
    validateToken,
};
