'use strict';

const postActions = require('../actions/Post');

const postService = {};

postService.getPosts = async (nameQuery, postUserId, limit, offset, userId) => {
    const posts = await postActions.getPosts(nameQuery, postUserId, limit + 1, offset);
    const hasMore = posts.length > limit;

    if (hasMore) {
        posts.pop();
    }

    return {
        posts: posts,
        hasMore,
    };
};

postService.addPost = async (name, contentJSON, userId) => {
    return await postActions.addPost(name, contentJSON, userId);
};

postService.getPost = async (postId, userId) => {
    return await postActions.getPost(postId, userId);
};

postService.likePost = async (postId) => {
    const likes = await postActions.likePost(postId);
    return { id: postId, likes };
};

postService.deletePost = async (postId, userId) => {
    await postActions.deletePost(postId, userId);

    return { id: postId, deleted: true };
};

module.exports = postService;
