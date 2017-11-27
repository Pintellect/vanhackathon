import React, { Component } from 'react';

import ContentPdf from './contentPdf'
import ContentHtml from './contentHtml'
import {AnnotatorContainer} from '../annotator/annotator'

export default class Content extends Component {
  render() {
    return (
      <AnnotatorContainer>
        {this.props.type === 'pdf' ?
        <ContentPdf {...this.props} /> :
        <ContentHtml {...this.props} />}
      </AnnotatorContainer>
    )
  }
}