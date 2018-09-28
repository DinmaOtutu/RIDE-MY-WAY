import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../public/assets/css/index.scss';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

const Index = () => (
  <React.Fragment>
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </React.Fragment>
    </Router>
    <Footer />
  </React.Fragment>
);

render(<Router><Index /></Router>, document.getElementById('root'));
