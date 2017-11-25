import React from 'react';
import { Document, Page } from 'react-pdf';

import '../css/pdf.css';

class PdfContainer extends React.Component {
  state = {
    file: './file.pdf',
    numPages: null,
  }

  constructor(props) {
    super(props);

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
    });
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

export default PdfContainer;
