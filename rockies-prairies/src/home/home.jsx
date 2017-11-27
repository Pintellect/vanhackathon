import React, { Component } from 'react';
import {ContentListContainer} from '../content-list/contentList'

class Home extends Component {
  render() {
    return (
      <div className="Home-intro">
        <ContentListContainer />
      </div>
    );
  }
}

export default Home;
