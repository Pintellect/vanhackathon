import React, { Component } from 'react';
import {PDF,Viewer} from './PDF/PdfViewer';

class PdfContainer extends Component {
    render() {
      return (
        <PDF src={this.props.pdfUrl}>
            <Viewer />
        </PDF>
      );
    }
  }

export default PdfContainer;