
import { combineReducers } from 'redux';
import {
  FETCH_POSTS,
  FETCH_HIGHLIGHT,
  CURRENT_POST,
  CURRENT_HIGHLIGHT,
  CURRENT_POPOVERBOX,
} from '../constants/actionTypes';

function getPostInfo(state = {
  post: null,
  posts: [],
}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, {
        posts: action.posts,
      });
    case CURRENT_POST:
      return Object.assign({}, state, {
        post: action.post,
      });
    default:
      return state;
  }
}

function getHighlightInfo(state = {
  showPopover: false,
  selectedText: null,
  selectedTextRenge: null,
  popoverBox: {
    top: 0,
    left: 0,
  },
}, action) {
  switch (action.type) {
    case FETCH_HIGHLIGHT:
      return Object.assign({}, state, {
        post: action.post,
        selectedText: action.selectedText,
      });
    case CURRENT_HIGHLIGHT:
      return Object.assign({}, state, {
        showPopover: action.showPopover,
        selectedText: action.selectedText,
      });
    case CURRENT_POPOVERBOX:
      return Object.assign({}, state, {
        popoverBox: action.popoverBox,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  getPostInfo,
  getHighlightInfo,
});

export default rootReducer;
