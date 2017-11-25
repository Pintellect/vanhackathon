import React, { Component } from 'react';
import logo from './logo.svg';
import DOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import { Document, Page } from 'react-pdf';

import './style.css';

const pdfJson = require('./json/pdf.json');

const htmlJson = require('./json/html.json');

class App extends Component {
  state = {
    file: './file.pdf',
    numPages: null,
  }

  constructor(props) {
    super(props);

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
    });
  }

  onMouseUp = (event) => {
    var selObj = window.getSelection();
    if(selObj.toString().length > 0) {
      var actions = document.getElementById('actions');
      actions.className = "show_actions";
      actions.style.top = event.pageY + 'px';
      actions.style.left = event.pageX + 'px';
    } else {
      var actions = document.getElementById('actions');
      actions.className = "hide_actions";
    }

    console.log(event.clientY);
    console.log(event.pageY)
  }

  highlight = () => {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var newNode = document.createElement("span");
    newNode.setAttribute("style", "background-color: pink;");
    range.surroundContents(newNode);
  }

  render() {
    const { file, numPages } = this.state;

    return (
      <div>
        <div className="Example__container">
          <div className="Example__container__document" onMouseUp={this.onMouseUp}>
            <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess} >
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
        </div>
        <div id="actions" className="hide_actions">
          <input type="image" src="img/highlight_white.png" onClick={this.highlight} />
          <input type="image" src="img/annotate_white.png" />
        </div>
      </div>
    );
  }
}

export default App;
