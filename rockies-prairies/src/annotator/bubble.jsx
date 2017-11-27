import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './bubble.css';

export default class Bubble extends Component {
  render() {
    return (
      <div className="bubble tooltip in" role="tooltip" style={this.props.position}>
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">
          <div className="btn-group" role="group" aria-label="First group">
            <button type="button" className="btn btn-default" onClick={this.props.onHighlight}>
              <i className="fa fa-pencil"></i>
              <span>Highlight</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Bubble.defaultProps = {
  position: {}
};

Bubble.propTypes = {
  onHighlight: PropTypes.func.isRequired
};