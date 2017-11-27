import React from 'react';

export default props => (
  props.type === "pdf" ? 
  <i className="fa fa-file-pdf-o" aria-hidden="true"></i> :
  <i className="fa fa-html5" aria-hidden="true"></i>
)