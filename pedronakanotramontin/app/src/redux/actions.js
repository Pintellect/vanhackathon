import fetch from 'cross-fetch';

// Request/receive actions for fetching post data
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

// Request/response actions for saving the annotation
export const SAVE_ANNOTATION_REQUEST = 'SAVE_ANNOTATION_REQUEST';
export const SAVE_ANNOTATION_RESPONSE = 'SAVE_ANNOTATION_RESPONSE';

// Wrappers for fetching posts and saving annotation actions
function requestPost() {
  return {
    type: REQUEST_POST,
  };
}

function receivePosts(postId, json) {
  return {
    type: RECEIVE_POST,
    postId,
    post: json,
  };
}

function requestSave() {
  return {
    type: SAVE_ANNOTATION_REQUEST,
  };
}

function receiveSaveResponse(annotation) {
  return {
    type: SAVE_ANNOTATION_RESPONSE,
    annotation,
  };
}
// -- End Wrappers

// Fetch the post data with specific ID
export function fetchPost(postId) {
  return (dispatch) => {
    dispatch(requestPost());

    return fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(postId, json)));
  };
}

function shouldFetchPost(state, postId) {
  const noPost = (state.postId === 0);
  const differentPost = (state.postId !== postId);

  const loadPost = noPost || differentPost;

  if (loadPost && !state.isFetching) {
    return true;
  }

  return false;
}

// Fetches post data only when needed: different ID or empty post data in memory
// Don't fetch if another one is going on
export function fetchPostIfNeeded(postId) {
  return (dispatch, getState) => {
    if (shouldFetchPost(getState(), postId)) {
      return dispatch(fetchPost(postId));
    }

    return false;
  };
}

// Saves a new annotation for the specific postId
export function saveAnnotation(postId, annotation) {
  return (dispatch) => {
    dispatch(requestSave());

    return fetch(`/api/posts/${postId}/annotation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(annotation),
    })
      .then(response => response.json())
      .then((json) => {
        const newAnnotation = Object.assign({}, annotation, {
          id: json.id,
        });

        dispatch(receiveSaveResponse(newAnnotation));
      });
  };
}
