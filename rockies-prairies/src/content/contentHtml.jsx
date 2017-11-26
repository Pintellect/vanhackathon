import React, { Component } from 'react';


export default class ContentHtml extends Component {
  render() {
    return (
      <div>
        {this.props.image ? 
        <figure className="text-center">
          <img src={this.props.image} alt={this.props.title} />
        </figure> : ""}
        <div dangerouslySetInnerHTML={{__html: this.props.content}} />
      </div>
    )
  }
}