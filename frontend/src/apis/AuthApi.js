import BaseApi from './BaseApi';

class AuthApi extends BaseApi {
    constructor(endpoint) {
        super(endpoint);

        this.createApiActions({
            name: 'login',
            method: BaseApi.Post,
            path: '/auth/login',
        }, {
            name: 'validateToken',
            method: BaseApi.Post,
            path: '/auth/validate-token',
        }, {
            name: 'register',
            method: BaseApi.Post,
            path: '/auth/register',
        });
    }
}

export default AuthApi;
