
import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';

import { currentPopover } from '../actions';

function hasSelection() {
  const selection = window.getSelection();
  return (
    selection &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0) &&
    !selection.getRangeAt(0).collapsed &&
    selection.getRangeAt(0).getBoundingClientRect().width > 0 &&
    selection.getRangeAt(0).getBoundingClientRect().height > 0
  );
}

function clearSelection() {
  if (hasSelection) {
    window.getSelection().removeAllRanges();
  }
}

const SelectionPopover = React.createClass({
  propTypes: {
    children: PropTypes.node,
    style: PropTypes.node,
    showPopover: PropTypes.bool,
    popoverBox: PropTypes.node,
    topOffset: PropTypes.number,
    onDeselect: PropTypes.func,
    onSelect: PropTypes.func,
  },
  getDefaultProps() {
    return {
      topOffset: 30,
      popoverBox: {
        top: 0,
        left: 0,
      },
    };
  },
  render() {
    const { onDeselect, onSelect, showPopover, popoverBox,
      children, style, topOffset, ...otherProps } = this.props;
    const { top, left } = popoverBox;
    console.log('highlight render');
    console.log(`showPopover ${showPopover}`);
    console.log(`popoverBox ${popoverBox.top} ${popoverBox.left}`);
    const visibility = showPopover ? 'visible' : 'hidden';
    const display = showPopover ? 'inline-block' : 'none';
    return (
      <div
        ref={
          (r) => {
            this.selectionPopover = r;
          }
        }
        style={{
          visibility,
          display,
          position: 'absolute',
          top,
          left,
          ...style,
        }}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
  componentDidMount() {
    const target = document.querySelector('[data-selectable]');
    target.addEventListener('mouseup', this.handleMouseUp);
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.showPopover === true && nextProps.showPopover === false) {
      clearSelection();
    }
  },
  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]');
    target.removeEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp() {
    if (hasSelection) {
      this.props.onSelect();
      return this.computePopoverBox();
    }
    return this.props.onDeselect();
  },
  computePopoverBox() {
    const selection = window.getSelection();
    if (!hasSelection()) {
      return;
    }
    const selectionBox = selection.getRangeAt(0).getBoundingClientRect();
    const popoverBox = this.selectionPopover.getBoundingClientRect();
    const targetBox = document.querySelector('[data-selectable]').getBoundingClientRect();
    const { dispatch } = this.props;
    dispatch(currentPopover({
      top: (selectionBox.top - targetBox.top) - this.props.topOffset,
      left: ((selectionBox.width / 2) - (popoverBox.width / 2))
        + (selectionBox.left - targetBox.left),
    }));
  },
  handleClickOutside() {
    this.props.onDeselect();
  },
});


const mapStateToProps = state => {
  const { getHighlightInfo } = state;
  const { showPopover, popoverBox } = getHighlightInfo;
  return { showPopover, popoverBox };
};

export default connect(
  mapStateToProps,
)(onClickOutside(SelectionPopover));
