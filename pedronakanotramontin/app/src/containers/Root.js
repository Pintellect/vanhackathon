import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

import { configureStore } from '../Utils';

const store = configureStore();

/*
 * Root container for the redux provider and the main application container.
 */
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
