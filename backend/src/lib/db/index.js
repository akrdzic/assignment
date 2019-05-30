'use strict';

const { Pool } = require('pg');

const appErrorCodes = require('../constants/ErrorCodes');
const postgresDbErrorCodes = require('../constants/PostgresErrorCodes');
const postgresDbUniqueViolationErrors = require('../constants/PostgresUniqueViolations');

const pool = new Pool({
    user: 'assignment',
    host: 'db',
    database: 'assignment',
    password: 'assignment',
    port: 5432,
});

pool.connect();

const dbErrorHandler = (error) => {
    switch (error.code) {
        case postgresDbErrorCodes.UNIQUE_VIOLATION:
            return postgresDbUniqueViolationErrors[error.constraint] || appErrorCodes.other;
        case postgresDbErrorCodes.NOT_NULL_VIOLATION:
        case postgresDbErrorCodes.FOREIGN_KEY_VIOLATION:
            return appErrorCodes.other;
        default:
            return appErrorCodes.other;
    }
};

const query = async (text, values) => {
    try {
        const { rows } = await pool.query(text, values);
        return rows;
    } catch(error) {
        console.log(error);
        const errorCode = dbErrorHandler(error);
        throw new Error(errorCode);
    }
};

module.exports = {
    query
};