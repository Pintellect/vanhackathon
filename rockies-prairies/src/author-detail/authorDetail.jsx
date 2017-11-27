import React from 'react';

export default props => (
  <small>
    <a href={props.author_url}>{props.author}</a>
  </small>
)