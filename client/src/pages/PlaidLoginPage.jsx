import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { plaidLogin } from '../api/plaid.api';
import SetupAccount from '../components/setup/SetupAccounts';
import { updateProfile, logout } from '../store/actions/auth.action';
import {
  USER_EMAIL,
  USER_TOKEN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from '../constants';

import './Pages.css';

class PlaidLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountsInfo: [],
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.logout = this.logout.bind(this);
    this.getAccountsInfo = this.getAccountsInfo.bind(this);
  }

  componentDidMount() {
    this.getAccountsInfo();
    document.body.style.backgroundColor = '#F0F2F5';
  }

  onExit() {}

  onSuccess(public_token) {
    const { user } = this.props;
    const { email, token } = user;

    this.props.plaidLogin({ email, token, public_token });
  }

  logout = e => {
    e.preventDefault();
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_TOKEN);
    localStorage.removeItem(USER_FIRST_NAME);
    localStorage.removeItem(USER_LAST_NAME);
    this.props.logout();
  };

  getAccountsInfo() {
    const { plaid } = this.props || {};
    const { transactions_each } = plaid || [];
    let accounts = [];

    if (transactions_each && transactions_each.length > 1) {
      transactions_each.forEach(account => {
        accounts.push({ name: account.name, type: account.type });
      });
    }

    return accounts;
  }

  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const accountsInfo = this.getAccountsInfo();
    return token ? (
      <SetupAccount
        accountsInfo={accountsInfo}
        has_profile={accountsInfo.length ? true : false}
        onSuccess={this.onSuccess}
        logout={this.logout}
      />
    ) : (
      <Redirect to="/login" />
    );
  }
}

function mapStateToProps(state) {
  const { user, plaid } = state;
  return {
    user,
    plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateProfile,
      plaidLogin,
      logout,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(PlaidLoginPage));
