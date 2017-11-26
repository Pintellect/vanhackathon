import React from 'react';

export default props => (
  <div className="addButton">
    <button onClick={props.onClick}>{props.children}</button>
  </div>
)