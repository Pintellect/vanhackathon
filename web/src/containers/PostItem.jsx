
import React, { Component } from 'react';

import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import PostItemPDF from './PostItemPDF';
import PostItemHTML from './PostItemHTML';
import Highlight from '../components/Highlight';
import { fetchHighlight, currentPost, currentHighlight } from '../actions';

class PostItem extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  addHighlightPopover() {
    const { dispatch } = this.props;
    if (window.getSelection()) {
      dispatch(currentHighlight(true, window.getSelection().toString()));
    }
  }
  removeHighlightPopover() {
    const { dispatch } = this.props;
    dispatch(currentHighlight(false, null));
  }
  confirmHighlight() {
    const { post, selectedText } = this.props;
    const { dispatch } = this.props;
    if (selectedText) {
      dispatch(fetchHighlight(post, selectedText));
      try {
        const range = window.getSelection().getRangeAt(0).cloneRange();
        const mark = document.createElement('mark');
        mark.setAttribute('id', `mark_${post}`);
        range.surroundContents(mark);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      } catch (e) {
        // console.log(e);
      }
      this.removeHighlightPopover();
    }
  }
  render() {
    const { match, posts } = this.props;
    const { dispatch } = this.props;
    const item = posts.find(x => x.id === match.params.item);
    let postItem = {};
    if (item) {
      dispatch(currentPost(item.id));
      if (item.type === 'pdf') {
        postItem = <PostItemPDF {...item} />;
      }
      if (item.type === 'html') {
        postItem = <PostItemHTML {...item} />;
      }
    }
    return (
      <section className="container">
        <div style={{ position: 'relative' }}>
          <div data-selectable>
            {postItem}
          </div>
          <Highlight
            onSelect={this.addHighlightPopover}
            onDeselect={this.removeHighlightPopover}
          >
            <button onClick={this.confirmHighlight}><i className="fa fa-magic" /> markup </button>
          </Highlight>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { getHighlightInfo, getPostInfo } = state;
  const { posts, post } = getPostInfo;
  const { showPopover, selectedText } = getHighlightInfo;
  return { showPopover, selectedText, posts, post };
};

export default connect(
  mapStateToProps,
)(PostItem);
