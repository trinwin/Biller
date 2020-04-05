import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import DashboardRoutes from './DashboardRoutes';
import withTracker from '../withTracker';

// Page
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SetupPage from '../pages/SetupPage';
import Link from '../components/Link';

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/setup" component={SetupPage} />
        <Route exact path="/link" component={Link} />
      </div>
    );
  }
}
export default RoutesComponent;
