
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';

import jQuery from 'jquery';
import AOS from 'aos';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/scss/font-awesome.scss';
import 'animate.css/animate.min.css';
import 'normalize.css/normalize.css';
import 'aos/dist/aos.css';
import './App.scss';

import Header from './layout/Header';
import Footer from './layout/Footer';

import Index from '../containers/Index';
import Posts from '../containers/Posts';
import PostItem from '../containers/PostItem';

import AllRoutes from './AllRoutes';

require('bootstrap/dist/js/bootstrap.min');

jQuery.noConflict();
AOS.init();

const routes = [
  {
    key: 'index',
    path: '/',
    exact: true,
    component: Index,
  }, {
    key: 'posts',
    path: '/posts',
    component: Posts,
    routes: [
    ],
  }, {
    key: 'post_item',
    path: '/post/:item',
    component: PostItem,
  },
];


const Layout = () => (
  <Router>
    <Switch>
      <StickyContainer>
        <section>
          <Sticky>
            {
              ({
                style,
              }) =>
                <Header style={style} />
            }
          </Sticky>
          { routes.map(route => <AllRoutes {...route} routes={route.routes} />) }
          <Footer />
        </section>
      </StickyContainer>
    </Switch>
  </Router>);

const App = () => (
  <Layout />
);

export {
  App as default,
};
