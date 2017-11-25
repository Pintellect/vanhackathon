import { combineReducers } from 'redux'

import {
    REQUEST_POST,
    RECEIVE_POST,
    SHOW_ACTION_BAR,
    HIDE_ACTION_BAR
} from './actions'

function posts(
  state = {
    isFetching: false,
    post: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        post: action.post
      })
    default:
      return state
  }
}

function actionBar(
  state = {
    visibility: false,
    position: {
      x: 0,
      y: 0
    }
  },
  action
) {
  switch (action.type) {
    case SHOW_ACTION_BAR:
      return Object.assign({}, state, {
        visibility: true,
        position: {
          x: action.position.x,
          y: action.position.y
        }
      })
    case HIDE_ACTION_BAR:
      return Object.assign({}, state, {
        visibility: false
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({ posts, actionBar });

export default rootReducer;
