import ActionTypes from '../../constants/ActionTypes';
import Api from '../../apis';

const retrievePosts = () => {
    return dispatch => {
      Api.post.getPosts()
          .then(response => {
              const result = response.body;

              dispatch({ type: ActionTypes.POSTS_LIST_RETRIEVED, result });
          })
          .catch(error => {
              dispatch({ type: ActionTypes.API_ERROR, error });
          });
    };
};

const uploadPostFromFile = (file) => {
  return dispatch => {
      Api.post.uploadPostFromFile({ files: [ { name: 'csvFile', file }] })
          .then((response) => {
                const post = response.body;

                dispatch({ type: ActionTypes.POST_CREATED, post });
          })
          .catch((error) => {
              dispatch({ type: ActionTypes.API_ERROR, error });
          });
  };
};

const deletePost = postId => {
    return dispatch => {
        Api.post.deletePost({ query: { postId }})
            .then(response => {
                const { id } = response.body;

                dispatch({ type: ActionTypes.POST_DELETED, postId: id });
            })
            .catch(error => {
                dispatch({ type: ActionTypes.API_ERROR, error });
            });
    };
};

export default {
    uploadPostFromFile,
    retrievePosts,
    deletePost,
};
