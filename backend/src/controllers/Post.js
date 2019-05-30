'use strict';

const postService = require('../lib/services/Post');

const csvFileToPost = require('../lib/helpers/CsvFileToPost');

const postController = {};

postController.getPosts = async (req, res, next) => {
    const { userId } = req.user;
    const { q, postUserId, limit, offset } = req.query;

    const posts = await postService.getPosts(q || '', postUserId || null, limit || 20, offset || 0, userId);

    res.status(200).send(posts);
};

postController.uploadPost = async (req, res, next) => {
    const { userId } = req.user;

    const csvFile = req.file;

    if (csvFile.mimetype !== 'text/csv') {
        res.status(400).send('Invalid file');

        return;
    }

    const postContent = await csvFileToPost(csvFile.path);

    if (! postContent) {
        res.status(400).send('Invalid file');

        return;
    }

    const post = await postService.addPost(csvFile.originalname.replace('.csv', ''), postContent, userId);

    res.status(200).send(post);
};

postController.getPost = async (req, res, next) => {
    const { userId } = req.user;
    const { postId } = req.params;

    const post = await postService.getPost(Number.parseInt(postId, 10), userId || -1);

    res.status(200).send(post);
};

postController.likePost = async (req, res, next) => {
    const { postId } = req.params;

    const post = await postService.likePost(postId);

    res.status(200).send(post);
};

postController.deletePost = async (req, res, next) => {
    const { userId } = req.user;
    const { postId } = req.params;

    const result = await postService.deletePost(Number.parseInt(postId, 10), userId);

    res.status(200).send(result);
};



module.exports = postController;
