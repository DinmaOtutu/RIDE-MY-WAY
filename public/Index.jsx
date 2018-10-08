import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../public/assets/css/index.scss';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';
import store from './store/store';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Rides from './components/Rides';
import ConfirmRides from './components/ConfirmRides';

const Index = () => (
  <Provider store={store}>
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/history" component={History} />
          <Route exact path="/rides" component={Rides} />
          <Route exact path="/confirm-rides" component={ConfirmRides} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  </Provider>
);

render(<Index />, document.getElementById('root'));
