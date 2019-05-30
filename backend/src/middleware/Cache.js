'use strict';

const redis = require('redis');
const cache = require('express-redis-cache');

const REDIS_SERVER_HOST = 'redis';
const REDIS_SERVER_PORT = 6379;
const REDIS_EXPIRE_CACHE = process.env.REDIS_EXPIRE_CACHE || 60;

const cacheInstance = cache({ client: redis.createClient(REDIS_SERVER_PORT, REDIS_SERVER_HOST) });

module.exports = {
    cacheRoute: () => cacheInstance.route({ expire: REDIS_EXPIRE_CACHE }),
    invalidateCacheRoute: (req, res, next) => {
        const { url } = req;
        const baseUrl = `/${url.split('/')[1]}`;

        // invalidate all GET methods caches for this endpoint
        cacheInstance.del(`${url}*`, () => {});
        cacheInstance.del(`${url}?q=*`, () => {});

        // invalidate GET methods caches for list of objects endpoint
        cacheInstance.del(baseUrl, () => {});
        cacheInstance.del(`${baseUrl}?q=*`, () => {});

        next();
    },
};
