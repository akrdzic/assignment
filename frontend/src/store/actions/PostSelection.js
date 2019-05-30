import ActionTypes from '../../constants/ActionTypes';
import Api from '../../apis';

const retrievePost = postId => {
    return dispatch => {
        Api.post.getPost({ query: { postId } })
            .then((response) => {
                const postData = response.body;

                dispatch({ type: ActionTypes.POST_SELECTION_POST_RETRIVED, postData });
            })
            .catch((error) => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};

const queryComparablePosts = (q, postUserId) => {
    return dispatch => {
        Api.post.getPosts({ query: { q, postUserId } })
            .then(response => {
                const { posts } = response.body;

                dispatch({ type: ActionTypes.POST_SELECTION_COMPARABLE_POSTS_QUERY_RESULTS, posts });
            })
            .catch(error => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};

const setSelectedComparablePosts = selectedPosts => {
    return dispatch => {
        dispatch({ type: ActionTypes.POST_SELECTION_SET_SELECTED_COMPARABLE_POSTS, selectedPosts });
    };
};

const likePost = postId => {
  return dispatch => {
      Api.post.likePost({ query: { postId }})
          .then(response => {
              const likeResults = response.body;

              dispatch({ type: ActionTypes.POST_SELECTION_LIKED, likeResults });
          })
          .catch(error => {
              dispatch({ type: ActionTypes.API_ERROR, error });
          });
  };
};

export default {
    retrievePost,
    queryComparablePosts,
    setSelectedComparablePosts,
    likePost,
};
