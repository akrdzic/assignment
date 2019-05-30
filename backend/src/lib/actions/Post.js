'use strict';

const db = require('../db');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ApplicationError = require('../errors/ApplicationError');

const ErrorCodes = require('../constants/ErrorCodes');
const ErrorMessages = require('../constants/ErrorMessages');

const postActions = {};

const fromDbData = (postData) => {
    return postData ? {
        id: postData.id,
        name: postData.name,
        userId: postData.user_id,
        userFullName: postData.user_full_name,
        content: postData.content,
        likes: postData.likes || 0
    } : null;
};

postActions.getPosts = async (nameQuery, postUserId, limit, offset) => {
    const result = await db.query(
        `SELECT * FROM data.get_posts($1, null, $2, $3, $4);`,
        [ nameQuery, postUserId, limit, offset ]);

    return result.map(r => fromDbData(r));
};

postActions.addPost = async (name, contentJSON, userId) => {
    const result = await db.query(
        `SELECT * FROM data.insert_post($1, $2, $3);`,
        [ name, contentJSON, userId ]);

    const id = result[0].insert_post;

    if (id < 0) {
        throw new ApplicationError(ErrorCodes.other, { message: ErrorMessages[ErrorCodes.other] });
    }

     return { id, name, content: contentJSON, userId, likes: 0 };
};

postActions.getPost = async (postId, userId) => {
    const result = await db.query(
        `SELECT * FROM data.get_posts(null, $1, null, 1);`,
        [ postId ]);

    return fromDbData(result[0]);
};

postActions.likePost = async (postId) => {
    const result = await db.query(
        `SELECT * FROM data.like_post($1);`,
        [ postId ]);

    if (result[0].like_post < 0) {
        switch (result[0].like_post) {
            case -1:
                throw new NotFoundError(ErrorCodes.post_not_found, { message: ErrorMessages[ErrorCodes.post_not_found ]});
            default:
                throw new ApplicationError(ErrorCodes.other, { message: ErrorMessages[ErrorCodes.other] });
        }
    }

    return result[0].like_post;
};

postActions.deletePost = async (postId, userId) => {
    const result = await db.query(
        `SELECT * FROM data.delete_post($1, $2);`,
        [ postId, userId ]);

    if (result[0].delete_post < 0) {
        switch (result[0].delete_post) {
            case -1:
                throw new NotFoundError(ErrorCodes.post_not_found, { message: ErrorMessages[ErrorCodes.post_not_found ]});
            case -2:
                throw new NotFoundError(ErrorCodes.user_not_found, { message: ErrorMessages[ErrorCodes.user_not_found ]});
            case -3:
                throw new ForbiddenError(ErrorCodes.user_not_post_owner, { message: ErrorMessages[ErrorCodes.user_not_post_owner ]});
            default:
                throw new ApplicationError(ErrorCodes.other, { message: ErrorMessages[ErrorCodes.other] });
        }
    }
};

module.exports = postActions;
