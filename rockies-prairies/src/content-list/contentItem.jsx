import React from 'react';
import { Link } from 'react-router-dom';

import ContentItemIcon from './contentItemIcon'

export default props => (
  <li className="list-group-item">
    <Link to={`/detail/${props.id}`}>
      <ContentItemIcon type={props.type} /> 
      &nbsp;
      {props.title}
    </Link>
  </li>
)