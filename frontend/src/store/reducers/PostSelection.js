import ActionTypes from '../../constants/ActionTypes';

const initialState = {
    post: null,
    comparablePostsQueryResults: [],
    comparablePosts: {},
    selectedComparablePostsList: [],
};

const postSelection = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.POST_SELECTION_POST_RETRIVED:
            const { postData } = action;
            return {
                comparablePostsQueryResults: [],
                comparablePosts: {},
                selectedComparablePostsList: [],
                post: postData,
            };
        case ActionTypes.POST_SELECTION_COMPARABLE_POSTS_QUERY_RESULTS:
            const { posts } = action;
            return {
                ...state,
                comparablePostsQueryResults: posts,
            };
        case ActionTypes.POST_SELECTION_SET_SELECTED_COMPARABLE_POSTS:
            const { selectedPosts } = action;
            return {
                ...state,
                selectedComparablePostsList: selectedPosts
            };
        case ActionTypes.POST_SELECTION_LIKED:
            const { likeResults } = action;
            const post = Object.assign({}, state.post);
            post.likes = likeResults.likes;

            return {
                ...state,
                post,
            };
        default:
            return state;
    }

};

export default postSelection;
