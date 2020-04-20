import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../api/login.api';
import Login from '../components/Login.jsx';
import '../components/static/style.js';

const LoginPage = props => {
  const onClick = values => {
    console.log(values);
    props.login({
      email: values.email,
      password: values.password,
    });
  };

  const user = props.user || {};
  const { token, has_profile } = user;

  return token ? (
    has_profile ? (
      <Redirect to="/dashboard" user={user} />
    ) : (
      <Redirect to="/setup" user={user} />
    )
  ) : (
    <Login onClick={e => onClick(e)} />
  );
};

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
