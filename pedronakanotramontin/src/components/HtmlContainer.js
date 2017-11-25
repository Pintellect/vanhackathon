import React from 'react';
import DOMPurify from 'dompurify';
import Parser from 'html-react-parser';

const HtmlContainer = (props) => {
  let { post } = props;

  return (
    <div className="html-container">
      {Parser(DOMPurify.sanitize(post.content))}
    </div>
  );
}

export default HtmlContainer;
