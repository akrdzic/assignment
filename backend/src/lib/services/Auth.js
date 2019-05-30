'use strict';

const accessToken = require('../helpers/AccessToken');

const userActions = require('../actions/User');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const ErrorCodes = require('../constants/ErrorCodes');
const ErrorMessages = require('../constants/ErrorMessages');


const authService = {};

authService.login = async (email, password) => {

    const user = await userActions.getUserByEmail(email);

    if (!user) {
        throw new NotFoundError(ErrorCodes.user_not_found, { message: ErrorMessages[ErrorCodes.user_not_found] });
    }

    if (!userActions.checkPasswordValid(password, user.password)) {
        throw new ForbiddenError(ErrorCodes.invalid_credentials, { message: ErrorMessages[ErrorCodes.invalid_credentials] });
    }

    const token = accessToken.generateAccessToken(user.id, email);

    return {
        userId: user.id,
        email,
        token,
    };
};

authService.register = async (firstName, lastName, email, password) => {
    const userId = await userActions.addUser(firstName, lastName, email, password);
    const token = accessToken.generateAccessToken(userId, email);

    return {
        userId,
        email,
        token,
    };
};

module.exports = authService;
