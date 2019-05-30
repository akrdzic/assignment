import BaseApi from './BaseApi';

class PostApi extends BaseApi {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions({
            name: 'uploadPostFromFile',
            method: BaseApi.Post,
            path: '/post',
        }, {
            name: 'getPost',
            method: BaseApi.Get,
            path: '/post/{postId}',
        }, {
            name: 'getPosts',
            method: BaseApi.Get,
            path: '/post',
        }, {
            name: 'likePost',
            method: BaseApi.Post,
            path: '/post/{postId}/like',
        },{
            name: 'deletePost',
            method: BaseApi.Delete,
            path: '/post/{postId}',
        });
    }
}

export default PostApi;
