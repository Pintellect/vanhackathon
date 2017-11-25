import React from 'react';

const AnnotateBar = (props) => {
  let { visibility, position } = props;

  let barClassName = "hide_actions";
  if (visibility === true) {
    barClassName = "show_actions";
  }

  return (
    <div className={barClassName} style={{ left: position.x, top: position.y }}>
      <input type="image" src="img/highlight_black.png" onClick={props.handleHighlight} />
      <input type="image" src="img/annotate_black.png" onClick={props.handleAnnotate} />
    </div>
  );
}

export default AnnotateBar;
