import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import rangy from 'rangy';
import rangyHighlight from 'rangy/lib/rangy-highlighter';
import rangyClassApplier from 'rangy/lib/rangy-classapplier';

import { loadHighlights, createHighlight, removeHighlight } from './actions';
import TextSelector from './selector';
import Bubble from './bubble';
import {AnnotationPaneContainer} from './annotationPane';

import './annotator.css';

export default class Annotator extends Component {
  state = {
    showBubble: false,
    bubblePosition: {}
  };

  constructor() {
    super();
    const self = this;

    rangy.init();
    this.highlighter = rangyHighlight.createHighlighter();
    
    this.highlighter.addClassApplier(rangyClassApplier.createClassApplier("highlight", {
      ignoreWhiteSpace: true,
      tagNames: ["span", "a"],
      elementProperties: {
        href: "",
        onclick: function (e) {
          e.preventDefault();
          const highlight = self.highlighter.getHighlightForElement(this);
          self.showAnnotationPane(highlight, e.clientY);
        }
      }
    }));

    this.createHighlight = this.createHighlight.bind(this);
    this.removeHighlight = this.removeHighlight.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.hideAnnotationPane = this.hideAnnotationPane.bind(this);
  }

  componentWillMount() {
    this.props.loadHighlights(window.location.toString());
  }

  componentWillReceiveProps(nextProps) {
    this.parseHighlights(nextProps.highlights);
  }

  parseHighlights(highlights) {
    if(highlights && highlights.length) {
      const serializedHighlights = [
        "type:textContent", 
        ...highlights.map((h) =>
          [
            h.rangeStart,
            h.rangeEnd,
            h.id,
            h.classApplier,
            h.elementId
          ].join("$"))
      ].join("|");

      setTimeout(() =>
        this.highlighter.deserialize(serializedHighlights)
      , 1000);
    }
  }

  createHighlight(e) {
    const highlights = this.highlighter.highlightSelection("highlight");
    if (!highlights || highlights.length <= 0)
      return;
    const highlight = highlights[0];

    const characterRange = highlight.characterRange;
    const data = {
      page: window.location.toString(),
      highlight: {
        id: highlight.id,
        rangeStart: characterRange.start,
        rangeEnd: characterRange.end,
        classApplier: highlight.classApplier.className,
        elementId: highlight.containerElementId
      }
    };
    
    this.clearSelection();
    const state = this.state;
    state.showBubble = false;    
    this.setState(state);
    const clientY = e.clientY;
    this.props.createHighlight(data)
      .then(() => {
        this.showAnnotationPane(highlight, clientY);
      });
  }
  
  removeHighlight() {
    const highlights = this.highlighter.unhighlightSelection();
    
    const highlight = highlights[0];
    highlight.page = window.location.toString();
    this.props.removeHighlight(highlight);
    
    this.clearSelection();
  }

  showAnnotationPane(highlight, clientY) {
    this.hideAnnotationPane();
    const state = this.state;
    state.annotationHighlight = highlight.id;
    state.showAnnotationPane = true;
    const top = window.pageYOffset - (document.clientTop || 0);
    state.panePosition = {
      top: clientY + top - 300
    };
    this.setState(state);
  }
  
  hideAnnotationPane() {
    const state = this.state;
    state.showAnnotationPane = false;
    this.setState(state);
  }

  clearSelection() {
    window.getSelection().removeAllRanges();
  }

  onSelectionChange(sel) {
    const state = this.state;
    state.showBubble = !sel.isCollapsed && (!sel.anchorNode || !sel.anchorNode.parentElement || !sel.anchorNode.parentElement.classList.contains("highlight"));
    if (state.showBubble) {
      const container = document.querySelector('.main-container');
      const boundary = sel._ranges[0].nativeRange.getBoundingClientRect();
      const top = window.pageYOffset - (document.clientTop || 0);
      state.bubblePosition = {
        left: (boundary.left + boundary.width / 2) - 35 - container.offsetLeft,
        top: boundary.top - 130 + top
      }
    }
    this.setState(state);
  }

  onDocumentClicked = (e) => {
    let obj;
    if (e.target) obj = e.target;
    else if (e.srcElement) obj = e.srcElement;
    if (obj.nodeType === 3) // defeat Safari bug
      obj = obj.parentNode;
    // if the user didn't click on a highlighted area, close any open annotation pane
    if (!obj.classList.contains("highlight")) {
      this.hideAnnotationPane();
    }
  };

  render() {
    const { showBubble, bubblePosition, showAnnotationPane, panePosition, annotationHighlight } = this.state;
    return (
      <div className="Annotator-container">
        <TextSelector onSelectionChange={this.onSelectionChange} onClicked={this.onDocumentClicked}>
          {this.props.children}
        </TextSelector>
        {showBubble ?
          <Bubble
            position={bubblePosition}
            onHighlight={this.createHighlight} /> : ""}
        {showAnnotationPane ?
          <AnnotationPaneContainer
            position={panePosition}
            highlight={annotationHighlight}
            onHide={this.hideAnnotationPane} /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({highlights: state.highlights[window.location.toString()] })
};
const mapDispatchToProps = dispatch => bindActionCreators({ loadHighlights, createHighlight, removeHighlight }, dispatch);

export const AnnotatorContainer = connect(mapStateToProps, mapDispatchToProps)(Annotator);