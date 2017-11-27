
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import renderHTML from 'react-render-html';

class PostItemHTML extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentWillMount() {
  }
  render() {
    const { content, image } = this.props;
    const html = renderHTML(unescape(content))
    return (
      <div id="viewer" contentEditable="true">
        <img src={image} alt="" />
        {html}
      </div>
    );
  }
}

export default PostItemHTML;
