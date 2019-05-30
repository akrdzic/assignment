'use strict';

const router = require('express').Router();

const forceAuthenticate = require('../middleware/ForceAuth');
const asyncMiddleware = require('../lib/helpers/AsyncMiddleware');
const { jsonParser, urlencodedParser, upload } = require('../middleware/Parser');
const { cacheRoute, invalidateCacheRoute } = require('../middleware/Cache');

const controllers = {
    auth: require('../controllers/Auth'),
    post: require('../controllers/Post'),
};

router.post('/auth/login', jsonParser, urlencodedParser, asyncMiddleware(controllers.auth.login));
router.post('/auth/register', jsonParser, urlencodedParser, asyncMiddleware(controllers.auth.register));
router.post('/auth/validate-token', jsonParser, urlencodedParser, forceAuthenticate, asyncMiddleware(controllers.auth.validateToken));

router.get('/post', jsonParser, urlencodedParser, cacheRoute(), asyncMiddleware(controllers.post.getPosts));
router.post('/post', upload.single('csvFile'), forceAuthenticate, invalidateCacheRoute, asyncMiddleware(controllers.post.uploadPost));
router.get('/post/:postId', jsonParser, urlencodedParser, cacheRoute(), asyncMiddleware(controllers.post.getPost));
router.delete('/post/:postId', jsonParser, urlencodedParser, forceAuthenticate, invalidateCacheRoute, asyncMiddleware(controllers.post.deletePost));
router.post('/post/:postId/like', jsonParser, urlencodedParser, invalidateCacheRoute, asyncMiddleware(controllers.post.likePost));

module.exports = router;
