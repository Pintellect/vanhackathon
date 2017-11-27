import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rangy from 'rangy';

class TextSelector extends Component {
  componentDidMount() {
    const self = this;
    document.querySelector(".Selector-container").addEventListener('mouseup', function (e) {
      setTimeout(function() {
        self.props.onClicked(e);
        let sel = rangy.getSelection();
        sel.refresh();
        self.props.onSelectionChange(sel);
      }, 50);
    });
  }

  render() {
    return (
      <div className="Selector-container">
        {this.props.children}
      </div>
    )
  }
}

TextSelector.propTypes = {
  onSelectionChange: PropTypes.func.isRequired,
  onClicked: PropTypes.func,
};

export default TextSelector;