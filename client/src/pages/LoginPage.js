import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../api/login.api';
import Login from '../components/login/Login';

import "./Pages.css"

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

  onSubmission = e => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Login
        onChange={e => this.onChange(e)}
        onSubmission={e => this.onSubmission(e)}
      />
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
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(LoginPage));
