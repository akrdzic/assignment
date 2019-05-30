import ActionTypes from '../../constants/ActionTypes';

const initialState = {
    list: [],
    hasMore: false,
};

const posts = (state = initialState, action) => {
    const { list } = state;
    switch (action.type) {
        case ActionTypes.POSTS_LIST_RETRIEVED:
            const { result } = action;
            return { list: result.posts, hasMore: result.hasMore };
        case ActionTypes.POST_CREATED:
            const { post } = action;

            list.unshift(post);

            return {
                ...state,
                list: Array.from(list),
            };
        case ActionTypes.POST_DELETED:
            const { postId } = action;
            list.splice(list.findIndex(p => p.id === postId), 1);
            return {
              list: Array.from(list),
            };
        default:
            return state;
    }
};

export default posts;
