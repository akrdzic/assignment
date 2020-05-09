import ActionTypes from '../../constants/ActionTypes';
import AccessToken from '../../constants/AccessToken';

const initialState = {
    isLoggedIn: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            const { userId, email, token } = action.data;

            localStorage.setItem(AccessToken, token);

            return {
                isLoggedIn: true,
                userId,
                email,
                token,
            };
        case ActionTypes.AUTH_FAILED:

            localStorage.removeItem(AccessToken);

            return { isUserLoggedIn: false };
        case ActionTypes.AUTH_LOGOUT:
            localStorage.removeItem(AccessToken);
            
            return { isUserLoggedIn: false };
        case ActionTypes.API_ERROR:
            const { error } = action;
            if (error.status === 401) {
                localStorage.removeItem(AccessToken);

                return { isUserLoggedIn: false };
            }
            return state;
        default:
            return state;

    }
};

export default auth;
