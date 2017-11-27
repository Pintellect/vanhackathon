import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./home/home";
import {ContentDetailContainer} from "./content-detail/contentDetail";
import logo from "./logo.jpg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a href="">
                <img alt="Brand" src={logo} />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <p className="navbar-text">Rockies & Prairies > Pintellect Challenge</p>
            </div>
          </div>
        </nav>
        <div className="container main-container">
          <div className="row">
            <Router>
              <div className="col-md-12">
                <Route exact path="/" component={Home} />
                <Route path="/detail/:id" component={ContentDetailContainer}/>
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
