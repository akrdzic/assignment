const errorCode = require('../lib/constants/ErrorCodes');
const errorMessages = require('../lib/constants/ErrorMessages');

const errorHandler = (err, req, res, next) => {
    if (err) {
        const status = err.status || 500;
        const code = err.code || errorCode.other;
        const message = status === 500 ?
            errorMessages[errorCode.other] :
            (err.message || errorMessages[errorCode.other]);

        res.status(status).send({ code, message: err.message });
    }

    next();
};

module.exports = errorHandler;
