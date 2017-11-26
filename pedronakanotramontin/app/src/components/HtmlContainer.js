import React from 'react';
import DOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import { PropTypes } from 'prop-types';

import '../css/HtmlContainer.css';

const HtmlContainer = (props) => {
  const { post } = props;

  return (
    <div className="html-container">
      <div className="html-document">
        <header>{post.title}</header>
        <main>
          {Parser(DOMPurify.sanitize(post.content))}
        </main>
      </div>
    </div>
  );
};

HtmlContainer.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default HtmlContainer;
