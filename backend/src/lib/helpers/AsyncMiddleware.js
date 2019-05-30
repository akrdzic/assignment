/**
 * Wrap async await routes to handle rejected promises
 *
 * @param fn
 * @returns {Function}
 */
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

module.exports = asyncMiddleware;
