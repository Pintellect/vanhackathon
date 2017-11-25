import fetch from 'cross-fetch'

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

export const SHOW_ACTION_BAR = 'SHOW_ACTION_BAR';
export const HIDE_ACTION_BAR = 'HIDE_ACTION_BAR';

function requestPost(postId) {
  return {
    type: REQUEST_POST
  }
}

function receivePosts(postId, json) {
  return {
    type: RECEIVE_POST,
    post: json
  }
}

export function fetchPost(postId) {
  return dispatch => {
    dispatch(requestPost(postId));

    return fetch(`/api/posts/${postId}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(postId, json)));
  }
}

export function showActionBar(x, y) {
  return dispatch => {
    dispatch({ type: SHOW_ACTION_BAR, position: { x: x, y: y } });
  }
}

export function hideActionBar() {
  return dispatch => {
    dispatch({ type: HIDE_ACTION_BAR });
  }
}
