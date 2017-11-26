import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import { PropTypes } from 'prop-types';

import '../css/PdfContainer.css';

class PdfContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: props.post.url,
      numPages: null,
    };

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { file, numPages } = this.state;

    return (
      <div className="pdf-container">
        <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
          {
            Array.from(
              new Array(numPages),
              (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ),
            )
          }
        </Document>
      </div>
    );
  }
}

PdfContainer.propTypes = {
  post: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default PdfContainer;
