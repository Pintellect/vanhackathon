
import api from '../services/api';
import {
  FETCH_POSTS,
  FETCH_HIGHLIGHT,
  CURRENT_POST,
  CURRENT_HIGHLIGHT,
  CURRENT_POPOVERBOX,
} from '../constants/actionTypes';

const fetchPosts = () => (dispatch) => {
  console.log('fetchPosts');
  api.getPosts().then(posts => dispatch({
    type: FETCH_POSTS,
    posts,
  }),
  );
};

const fetchHighlight = (post, selectedText) => (dispatch) => {
  console.log(`fetchHighlight ${post} ${selectedText}`);
  api.sendMarkup({ post, text: selectedText })
    .then(() => dispatch({
      type: FETCH_HIGHLIGHT,
      post,
      selectedText,
    }),
    );
};


const currentPost = post => (dispatch) => {
  console.log(`currentPost ${post}`);
  dispatch({
    type: CURRENT_POST,
    post,
  });
};

const currentPopover = popoverBox => (dispatch) => {
  console.log(`currentPopover ${popoverBox}`);
  dispatch({
    type: CURRENT_POPOVERBOX,
    popoverBox,
  });
};

const currentHighlight = (showPopover, selectedText) => (dispatch) => {
  console.log(`currentHighlight ${showPopover} ${selectedText}`);
  dispatch({
    type: CURRENT_HIGHLIGHT,
    showPopover,
    selectedText,
  });
};


export {
  fetchPosts,
  fetchHighlight,
  currentPopover,
  currentPost,
  currentHighlight,
};
