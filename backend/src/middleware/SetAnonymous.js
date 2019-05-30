'use strict';

const setAnonymous = (req, res, next) => {

    if (!req.user) {
        req.user = { userId: -1 };
    }

    next();
};

module.exports = setAnonymous;
