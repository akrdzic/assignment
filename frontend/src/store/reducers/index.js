import { combineReducers } from 'redux';
import auth from './Auth';
import posts from './Posts';
import postSelection from './PostSelection';

export default combineReducers({
    auth,
    posts,
    postSelection,
});
