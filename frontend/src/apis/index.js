import AuthApi from './AuthApi';
import PostApi from './PostApi';

import Config from '../config';

export default {
    auth: new AuthApi(Config.apiUrl),
    post: new PostApi(Config.apiUrl),
};
