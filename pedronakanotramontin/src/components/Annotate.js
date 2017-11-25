import React from 'react';

import AnnotateBar from './AnnotateBar';
import HtmlContainer from './HtmlContainer';
import PdfContainer from './PdfContainer';

class Annotate extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseUp = (event) => {
    var selObj = window.getSelection();
    if(selObj.toString().length > 0) {
      this.props.showBar(event.pageX, event.pageY);
    } else {
      this.props.hideBar();
    }
  }

  render() {
    let { post, visibility, position } = this.props;

    let container = <div>No Posts</div>;
    if (post !== null) {
      if (post.type === 'html') {
        container = <HtmlContainer post={post} />;
      } else if (post.type === 'pdf') {
        container = <PdfContainer post={post} />;
      }
    }

    return (
      <div>
        <div id="post-container" onMouseUp={this.onMouseUp}>
          {container}
        </div>
        <AnnotateBar visibility={visibility} position={position} />
      </div>
    );
  }
}

export default Annotate;
