
import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

const AllRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

// AllRoutes.propTypes = {
//   component: PropTypes.string.isRequired,
//   routes: PropTypes.string.isRequired,
// };


export {
  AllRoutes as default,
};
