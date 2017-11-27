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

/**
 * Main application container, where the most important state is manipulated.
 * Here we track the state of fetching post data and saving annotations, also
 * the post being displayed to the user and the annotations he created.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = action => this.props.dispatch(action);

    this.handleFetchPost = this.handleFetchPost.bind(this);
    this.handleSaveAnnotation = this.handleSaveAnnotation.bind(this);
  }

  // Loads the html post by default when the application is initialized
  componentDidMount() {
    this.handleFetchPost(1);
  }

  // Dispatches the action to load a post
  handleFetchPost(postId) {
    this.dispatch(fetchPostIfNeeded(postId));
  }

  // Dispatches the action to save an annotation
  handleSaveAnnotation(annotation) {
    if (this.props.post) {
      this.dispatch(saveAnnotation(this.props.post.id, annotation));
    }
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
    post,
    annotations,
  } = state;

  return {
    isFetching, // Track the loading state of post data
    isSaving, // Track the saving state of annotations
    post, // Last fetched post
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
  post: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
  }),
};

App.defaultProps = {
  post: { id: 0 },
};

export default connect(mapStateToProps)(App);
