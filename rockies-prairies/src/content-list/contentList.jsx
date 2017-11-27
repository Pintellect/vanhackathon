import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchContent } from './actions';
import ContentItem from './contentItem';
import './contentList.css';

export default class ContentList extends Component {
  componentWillMount() {
    this.props.fetchContent();
  }

  render() {
    return (           
      <div>
        <div className="page-header">
          <h1>
            Content list
          </h1>
        </div>

        <ul className="list-group">
        {this.props.items.map((item, index) => <ContentItem key={index} {...item} />)}
        </ul>
      </div>
    )
  };
}

const mapStateToProps = state => ({items: state.contentList});
const mapDispatchToProps = dispatch => bindActionCreators({ fetchContent }, dispatch);

export const ContentListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentList);