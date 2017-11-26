import React from 'react';
import { PropTypes } from 'prop-types';

import rangy from 'rangy/lib/rangy-core';
import rangySaveRestore from 'rangy/lib/rangy-selectionsaverestore';

import AnnotateForm from './AnnotateForm';
import HtmlContainer from './HtmlContainer';
import PdfContainer from './PdfContainer';

import {
  highlight,
  newAnnotation,
  hasNewAnnotation,
  hasNewPost,
  changedFormVisibility,
} from '../Utils';

import '../css/Annotate.css';

const FORM_VISIBLE = 'visible';
const FORM_HIDDEN = 'hidden';

class Annotate extends React.Component {
  constructor(props) {
    super(props);

    /* Control the internal state of this component */
    this.state = {
      formVisibility: FORM_HIDDEN, // Controls the form visibility
      formPosition: 0, // Y position of the form
      selection: {}, // The text selection
    };

    this.onMouseUp = this.onMouseUp.bind(this);
    this.handleFormSaveClick = this.handleFormSaveClick.bind(this);
  }

  componentDidMount() {
    rangy.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (hasNewAnnotation(this.props.annotations, nextProps.annotations)) {
      return true;
    }

    if (hasNewPost(this.state.post, nextProps.post)) {
      return true;
    }

    if (changedFormVisibility(this.state.formVisibility, nextState.formVisibility)) {
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps) {
    const totalAnnotations = nextProps.annotations.length;
    const lastAnnotation = nextProps.annotations[totalAnnotations - 1];

    if (lastAnnotation && hasNewAnnotation(this.props.annotations, nextProps.annotations)) {
      highlight(lastAnnotation.selection);
    }
  }

  onMouseUp(event) {
    const userSelection = window.getSelection();
    if (userSelection.toString().length > 0) {
      this.setState({
        formVisibility: FORM_VISIBLE,
        formPosition: event.pageY,
        selection: rangySaveRestore.saveSelection(),
      });
    } else {
      this.setState({
        formVisibility: FORM_HIDDEN,
        formPosition: 0,
        selection: {},
      });
    }
  }

  handleFormSaveClick(description) {
    const { handleSaveAnnotation } = this.props;
    const { formPosition, selection } = this.state;

    this.setState({ formVisibility: FORM_HIDDEN });

    handleSaveAnnotation({
      selection,
      position: formPosition,
      description,
    });
  }

  render() {
    const { post, handleSaveAnnotation, annotations } = this.props;
    const { formVisibility, formPosition, selection } = this.state;

    let container = <div>Invalid Post</div>;
    if (post !== null) {
      if (post.type === 'html') {
        container = <HtmlContainer post={post} />;
      } else if (post.type === 'pdf') {
        container = <PdfContainer post={post} />;
      }
    }

    return (
      <div className="annotate-container">
        <div className="annotate-container-left" />
        <div className="annotate-container-middle" role="document">
          <div role="presentation" onMouseUp={this.onMouseUp}>
            {container}
          </div>
        </div>
        <div className="annotate-container-right">
          {
            annotations.map(annotation => (
              newAnnotation(annotation)
            ))
          }
          <AnnotateForm
            formVisibility={formVisibility}
            formPosition={formPosition}
            selection={selection}
            handleSaveAnnotation={handleSaveAnnotation}
            handleFormSaveClick={this.handleFormSaveClick}
          />
        </div>
      </div>
    );
  }
}

Annotate.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    position: PropTypes.number,
    description: PropTypes.string,
  })).isRequired,
  handleSaveAnnotation: PropTypes.func.isRequired,
  post: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
  }),
};

Annotate.defaultProps = {
  post: {},
};

export default Annotate;
