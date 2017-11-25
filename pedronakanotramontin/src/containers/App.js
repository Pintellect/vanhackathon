import React, { Component } from 'react';
import { connect } from 'react-redux'

import Annotate from '../components/Annotate'

import {
    fetchPost,
    showActionBar,
    hideActionBar
} from '../actions'


import '../css/App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.loadHtml = this.loadHtml.bind(this);
    this.loadPdf = this.loadPdf.bind(this);

    this.showBar = this.showBar.bind(this);
    this.hideBar = this.hideBar.bind(this);
  }

  componentDidMount() {
    this.loadHtml();
  }

  areEqual(json1, json2) {
    if (json1 !== json2 || (json1 && !json2) || (!json1 && json2))
      return false;

    if (json1 != null && json2 != null) {
      let type1 = json1.type;
      let title1 = json1.title;

      let type2 = json2.type;
      let title2 = json2.title;

      if (type1.localeCompare(type2) !== 0 || title1.localeCompare(title2) !== 0)
        return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    if (!this.areEqual(this.props.post, prevProps.post)) {
      console.log("Atualizado");
    }
  }

  loadHtml() {
    const { dispatch } = this.props;
    dispatch(fetchPost(1));
  }

  loadPdf() {
    const { dispatch } = this.props;
    dispatch(fetchPost(2));
  }

  showBar(x, y) {
    const { dispatch } = this.props;
    dispatch(showActionBar(x, y));
  }

  hideBar() {
    const { dispatch } = this.props;
    dispatch(hideActionBar());
  }

  render() {
    let { post, visibility, position } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Highlight and Annotations</h1>
          <button className="button-load" onClick={this.loadHtml}>Load HTML</button>
          <button className="button-load" onClick={this.loadPdf}>Load PDF</button>
        </header>
        <content>
          <Annotate
            post={post}
            showBar={this.showBar}
            hideBar={this.hideBar}
            visibility={visibility}
            position={position}
          />
        </content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, actionBar } = state

  const { isFetching, post } = posts;
  const { visibility, position } = actionBar;

  return {
    isFetching,
    post,
    visibility,
    position
  }
}

export default connect(mapStateToProps)(App)
