import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PDFJS from 'pdfjs-dist/';

class PDF extends Component {
    constructor (props) {
      super(props)
      this.state = {
        pdf: null,
        scale: 1.2
      }
    }
    getChildContext () {
      return {
        pdf: this.state.pdf,
        scale: this.state.scale
      }
    }
    componentDidMount () {
      PDFJS.getDocument(this.props.src).then((pdf) => {
        console.log(pdf)
        this.setState({ pdf })
      });
    }
    render () {
      return (<div className='pdf-context'>{this.props.children}</div>) 
    }
  }
  /** .................................................................. */
  PDF.propTypes = {
    src: PropTypes.string.isRequired
  }
  
  PDF.childContextTypes = {
    pdf: PropTypes.object,
    scale: PropTypes.number
  }

  export default PDF

  /*export default scriptLoader(    
    './textlayerbuilder.js'
  )(PDF)*/