import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import DashboardRoutes from './DashboardRoutes';
import withTracker from '../withTracker';

// Page
import Landing from '../components/landing/Landing.jsx';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlaidLoginPage from '../pages/PlaidLoginPage';

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/setup" component={PlaidLoginPage} />
        {DashboardRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
    );
  }
}
export default RoutesComponent;
