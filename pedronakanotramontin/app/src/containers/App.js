import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Annotate from '../components/Annotate';

import {
  fetchPostIfNeeded,
  saveAnnotation,
} from '../redux/actions';


import '../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFetchPost = this.handleFetchPost.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostIfNeeded(1));
  }

  handleFetchPost(postId) {
    const { dispatch } = this.props;
    dispatch(fetchPostIfNeeded(postId));
  }

  handleSaveAnnotation(annotation) {
    const { dispatch, postId } = this.props;
    dispatch(saveAnnotation(postId, annotation));
  }

  render() {
    const { post, annotations } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Highlight and Annotations</h1>
          <Button bsStyle="primary" onClick={() => this.handleFetchPost(1)}>Load HTML</Button>
          <Button bsStyle="primary" onClick={() => this.handleFetchPost(2)}>Load PDF</Button>
          <Button bsStyle="primary" onClick={() => this.handleFetchPost(3)}>Load Invalid</Button>
        </header>
        <content>
          <Annotate
            post={post}
            annotations={annotations}
            handleSaveAnnotation={this.handleSaveAnnotation}
          />
        </content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    isSaving,
    annotations,
    post,
  } = state;

  return {
    isFetching, // Track the loading state of post data
    post, // Last fetched post
    isSaving, // Track the saving state of annotations
    annotations, // Annotations saved by the user
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    position: PropTypes.number,
    description: PropTypes.string,
  })).isRequired,
  postId: PropTypes.number,
  post: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
  }),
};

App.defaultProps = {
  postId: 0,
  post: {},
};

export default connect(mapStateToProps)(App);
