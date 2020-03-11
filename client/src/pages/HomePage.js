import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { USER_TOKEN } from '../constants';
import { logout } from '../store/actions/auth.action';

<<<<<<< HEAD
import Landing from '../components/landing/Landing';
import Home from '../components/home/Home';
import HeaderPage from "../components/header/Header";
=======
import Landing from '../components/Landing';
import Home from '../components/Home';
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347

class HomePage extends Component {
  onClick = e => {
    e.preventDefault();
    localStorage.removeItem(USER_TOKEN);
    this.props.logout();
  };

  render() {
    const user = this.props.user || {};
    return user && user.token ? (
      <Home logout={e => this.onClick(e)} />
    ) : (
<<<<<<< HEAD
      <div>
        <HeaderPage/>>
        <Landing />
      </div>
=======
      <Landing />
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
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
