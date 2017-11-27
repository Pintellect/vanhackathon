
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import Badge from '../components/Badge';
import { fetchPosts } from '../actions';

function getUrl(item) {
  return `/post/${item.id}`;
}

function getClassname(item) {
  let className = '';
  if (item.type === 'html') {
    className = 'fa-html5';
  } else if (item.type === 'pdf') {
    className = 'fa-file-pdf-o';
  }
  return className;
}

class Posts extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }
  render() {
    const { routes, posts } = this.props;
    return (
      <section className="container-fluid">
        <Row>
          {
            posts.map((item) => {
              return (
                <Badge {...item} url={getUrl(item)} className={getClassname(item)} />
              );
            })
          }
        </Row>
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { getPostInfo } = state;
  const { posts } = getPostInfo;
  return { posts };
};

export default connect(
  mapStateToProps,
)(Posts);
