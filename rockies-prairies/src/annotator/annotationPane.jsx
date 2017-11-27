import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadAnnotations, createAnnotation, removeAnnotation } from './actions'
import {AnnotationFormContainer} from './annotationForm'
import AnnotationList from './annotationList'
import AddButton from './addButton';

import './annotationPane.css';

export default class AnnotationPane extends Component {

  constructor() {
    super();
    this.createAnnotation = this.createAnnotation.bind(this);
    this.state = {
      showAddForm: false
    };
  }

  componentWillMount() {
    this.props.loadAnnotations(window.location.toString(), this.props.highlight);
  }

  createAnnotation(values) {
    this.hideAddForm();
    const data = {
      page: window.location.toString(),
      highlightId: this.props.highlight,
      annotation: {...values, date: new Date()}
    };
    this.props.createAnnotation(data);
  }

  showAddForm = () => { this.setShowAddForm(true); };
  hideAddForm = () => { this.setShowAddForm(false); };
  setShowAddForm = (show) => {
    const state = this.state;
    state.showAddForm = show;
    this.setState(state);
  };

  render() {
    const { position, onHide, annotations } = this.props;
    const showAddForm = (annotations.length <= 0) || this.state.showAddForm;
    return (
      <div className="Annotation-container" style={position}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <span className="pull-right" onClick={onHide}><i className="fa fa-times"></i></span>
            Annotations
          </div>
          <div className="panel-body">
            {showAddForm ?
              <AnnotationFormContainer onSubmit={this.createAnnotation}/>
              :
              <AddButton onClick={this.showAddForm}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></AddButton>
            }
            <AnnotationList data={annotations} />
          </div>
        </div>
      </div>
    )
  }
}

AnnotationPane.defaultProps = {
  show: false,
  position: {}
};

// TODO remove the code duplication of this with annotator.jsx's
const mapStateToProps = (state, props) => {
  const highlights = state.highlights[window.location.toString()];
  const filter = highlight => highlight.id === props.highlight;
  const annotations = highlights && highlights.filter(filter).length ? highlights.filter(filter)[0].annotations || [] : [];
  return {annotations};
};
const mapDispatchToProps = dispatch => bindActionCreators({ loadAnnotations, createAnnotation, removeAnnotation }, dispatch);

export const AnnotationPaneContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationPane);