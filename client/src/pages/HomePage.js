import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { USER_EMAIL, USER_TOKEN, ACCOUNTS_INFO } from '../constants';
import { logout } from '../store/actions/auth.action';

import Landing from '../components/landing/Landing.jsx';
import Home from '../components/Home';
import '../components/static/style.js';

class HomePage extends Component {
  onClick = e => {
    e.preventDefault();
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(ACCOUNTS_INFO);
    this.props.logout();
  };

  render() {
    const user = this.props.user || {};
    return user && user.token ? (
      <Home logout={e => this.onClick(e)} />
    ) : (
      <Landing />
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
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
