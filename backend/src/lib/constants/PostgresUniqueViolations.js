'use strict';

const appErrorCodes = require('./ErrorCodes');

const postgresDbUniqueViolationErrors = {
    users_email_uindex: appErrorCodes.email_in_use
};

module.exports = postgresDbUniqueViolationErrors;
