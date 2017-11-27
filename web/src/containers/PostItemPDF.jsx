/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import autoBind from 'react-autobind';
import { PDFJS } from 'pdfjs-dist';

import './PostItemPDF.scss';

// require('pdfjs-dist/build/pdf.combined');


function addPage(num) {
  const page = document.createElement('div');
  const canvas = document.createElement('canvas');
  const wrapper = document.createElement('div');
  const textLayer = document.createElement('div');
  page.className = 'page';
  wrapper.className = 'canvasWrapper';
  textLayer.className = 'textLayer';
  page.setAttribute('id', `pageContainer${num}`);
  page.setAttribute('data-loaded', 'false');
  page.setAttribute('data-page-number', num);
  canvas.setAttribute('id', `page${num}`);
  page.appendChild(wrapper);
  page.appendChild(textLayer);
  wrapper.appendChild(canvas);
  return page;
}

class PostItemPDF extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      document: {},
    };
  }
  componentWillMount() {
    const { content } = this.props;
    PDFJS.getDocument(content).promise
      .then((pdf) => {
        this.setState({
          document: pdf,
        });
        const viewer = document.getElementById('viewer');
        for (let i = 1; i <= pdf.pdfInfo.numPages; i++) {
          const page = addPage(i);
          viewer.appendChild(page);
          this.loadPage(i);
        }
      }, (e) => {
        console.error(e);
      });
  }
  loadPage(pageNum) {
    return this.state.document.getPage(pageNum)
      .then((pdfPage) => {
        const page = document.getElementById(`pageContainer${pageNum}`);
        const canvas = page.querySelector('canvas');
        const wrapper = page.querySelector('.canvasWrapper');
        const container = page.querySelector('.textLayer');
        const canvasContext = canvas.getContext('2d');
        const viewport = pdfPage.getViewport(1.5);
        canvas.width = viewport.width * 2;
        canvas.height = viewport.height * 2;
        page.style.width = `${viewport.width}px`;
        page.style.height = `${viewport.height}px`;
        wrapper.style.width = `${viewport.width}px`;
        wrapper.style.height = `${viewport.height}px`;
        container.style.width = `${viewport.width}px`;
        container.style.height = `${viewport.height}px`;
        pdfPage.render({
          canvasContext,
          viewport,
        });
        pdfPage.getTextContent().then((textContent) => {
          PDFJS.renderTextLayer({
            textContent,
            container,
            viewport,
            textDivs: [],
          });
        });
        page.setAttribute('data-loaded', 'true');
        return pdfPage;
      }, (e) => {
        console.error(e);
      });
  }
  render() {
    return (
      <div id="viewer" className="pdfViewer" contentEditable="true" />
    );
  }
}


export default PostItemPDF;
