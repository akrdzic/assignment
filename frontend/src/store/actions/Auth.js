import ActionTypes from '../../constants/ActionTypes';
import Api from '../../apis';

const login = (email, password) => {
    return (dispatch) => {
        Api.auth.login({ payload: { email, password }})
            .then((response) => {
                const data = response.body;

                dispatch({ type: ActionTypes.AUTH_SUCCESS , data });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};

const register = (email, password, firstName, lastName) => {
    return (dispatch) => {
        Api.auth.register({ payload: { email, password, firstName, lastName }})
            .then((response) => {
                const data = response.body;

                dispatch({ type: ActionTypes.AUTH_SUCCESS , data });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};

const getLoginStatus = () => {
    return (dispatch) => {
        Api.auth.validateToken()
            .then((response) => {
                const data = response.body;

                dispatch({ type: ActionTypes.AUTH_SUCCESS , data });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};


export default {
    login,
    register,
    getLoginStatus,
};
