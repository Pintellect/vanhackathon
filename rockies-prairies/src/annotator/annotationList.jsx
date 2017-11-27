import React from 'react';
import Moment from 'moment';

export default ({data}) => (
  <div>
    {data.map((annotation, index) => (
      <div key={index} className="alert alert-info" role="alert">
        <strong>{annotation.name}</strong> <small>posted on {Moment(annotation.date).format('d MMM YYYY, h:mm:ss a')}</small>
        <p>{annotation.notes}</p>
      </div>
    ))}
  </div>
)