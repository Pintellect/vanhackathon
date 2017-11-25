import React, { Component } from 'react';
import logo from './logo.svg';
import DOMPurify from 'dompurify';
import Parser from 'html-react-parser';
import { Document, Page } from 'react-pdf';

import './App.css';
import './actions.css';

const pdfJson = require('./json/pdf.json');

const htmlJson = require('./json/html.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  onMouseUp = (event) => {
    var selObj = window.getSelection();
    if(selObj.toString().length > 0) {
      var actions = document.getElementById('actions');
      actions.className = "show_actions";
      actions.style.top = event.pageY + 'px';
      actions.style.left = event.pageX + 'px';

      console.log(actions);
    } else {
      var actions = document.getElementById('actions');
      actions.className = "hide_actions";
    }
  }

  highlight = () => {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var newNode = document.createElement("span");
    newNode.setAttribute("style", "background-color: pink;");
    range.surroundContents(newNode);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div onMouseUp={this.onMouseUp}>
          {Parser(DOMPurify.sanitize(htmlJson.content))}
        </div>
        <div id="actions" className="hide_actions">
          <input type="image" src="img/highlight_black.png" onClick={this.highlight} />
          <input type="image" src="img/annotate_black.png" />
        </div>
      </div>
    );
  }
}

export default App;
