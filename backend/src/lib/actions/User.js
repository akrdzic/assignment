'use strict';

const db = require('../db');

const { hashPassword } = require('../helpers/Auth');

const BadRequestError = require('../errors/BadRequestError');
const ApplicationError = require('../errors/ApplicationError');

const ErrorCodes = require('../constants/ErrorCodes');
const ErrorMessages = require('../constants/ErrorMessages');

const userActions = {};


userActions.addUser = async (firstName, lastName, email, password) => {
    const result = await db.query(
        `SELECT * FROM data.insert_user($1, $2, $3, $4);`,
        [ firstName, lastName, email, hashPassword(password) ]);

    const id = result[0].insert_user;

    if (id > 0) {
        return id;
    }

    switch (id) {
        case -1:
            throw new BadRequestError(ErrorCodes.email_in_use, { message: ErrorMessages[ErrorCodes.email_in_use] });
        default:
            throw new ApplicationError(ErrorCodes.other, { message: ErrorMessages[ErrorCodes.other] });
    }
};

userActions.getUserByEmail = async (email) => {
    const data =  await db.query(
        `SELECT * FROM data.get_user_by_email($1);`,
        [ email ]);

    return data[0];
};

userActions.checkPasswordValid = (plainTextPassword, hashedPassword) => {
    return hashPassword(plainTextPassword) === hashedPassword;
};

module.exports = userActions;
