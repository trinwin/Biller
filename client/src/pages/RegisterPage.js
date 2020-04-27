import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { register } from '../api/register.api';
import Register from '../components/Register.jsx';
import history from '../router/History';

import './Pages.css';

class RegisterPage extends Component {
  onSubmission = e => {
    this.props.register({
      email: e.email,
      password: e.password,
      confirm: e.confirm,
      firstname: e.firstname,
      lastname: e.lastname,
    });

    if (this.props.success) {
      history.push('/setup');
    }
  };

  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/setup" user={user} />
    ) : (
      <Register onSubmission={e => this.onSubmission(e)} />
    );
  }
}

// Store
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(RegisterPage));
