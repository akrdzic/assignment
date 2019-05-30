const errorCode = require('../lib/constants/ErrorCodes');
const errorMessages = require('../lib/constants/ErrorMessages');
const UnauthorizedError = require('../lib/errors/UnauthorizedError');

const forceAuth = (req, res, next) => {

    if (!req.user || req.user.userId < 0) {
        throw new UnauthorizedError(errorCode.authentication_required, { message: errorMessages[errorCode.authentication_required ] });
    }

    next();
};

module.exports = forceAuth;
