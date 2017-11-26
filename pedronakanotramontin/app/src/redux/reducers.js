import {
  REQUEST_POST,
  RECEIVE_POST,
  SAVE_ANNOTATION_REQUEST,
  SAVE_ANNOTATION_RESPONSE,
} from './actions';

function posts(
  state = {
    isFetching: false,
    postId: 0,
    post: null,
    isSaving: false,
    annotations: [],
  },
  action,
) {
  switch (action.type) {
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        postId: action.postId,
        post: action.post,
        annotations: [],
      });
    case SAVE_ANNOTATION_REQUEST:
      return Object.assign({}, state, {
        isSaving: true,
      });
    case SAVE_ANNOTATION_RESPONSE:
      return Object.assign({}, state, {
        isSaving: false,
        annotations: state.annotations.concat(action.annotation),
      });
    default:
      return state;
  }
}

const rootReducer = posts;

export default rootReducer;
