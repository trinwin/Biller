import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { plaidLogin } from '../api/plaid.api';
import SetupAccount from '../components/setup/SetupAccounts';
import { updateProfile } from '../store/actions/auth.action';
import { USER_TOKEN, ACCOUNTS_INFO } from '../constants';

import './Pages.css';

class PlaidLoginPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#F0F2F5';
  }

  onExit() {}

  onSuccess(public_token, metadata) {
    console.log(public_token);
    const { user, plaid } = this.props;
    const { email, token } = user;
    console.log('[SetupForm] user: ', user);

    this.props.plaidLogin({
      email,
      token,
      public_token,
    });

    const previousForms = JSON.parse(localStorage.getItem(ACCOUNTS_INFO)) || [];
    const forms = [
      ...previousForms,
      {
        accountNum: metadata.accounts.length,
        bankName: metadata.institution.name,
      },
    ];

    console.log('plaid.errors: ' + plaid.errors);
    if (!plaid.errors) {
      this.props.updateProfile({ has_profile: true });
      localStorage.setItem(ACCOUNTS_INFO, JSON.stringify(forms));
    }
  }

  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { user } = this.props;
    const forms = JSON.parse(localStorage.getItem(ACCOUNTS_INFO)) || [];

    console.log('forms: ', forms);
    return token ? (
      <SetupAccount
        forms={forms}
        has_profile={user.has_profile}
        onSuccess={this.onSuccess}
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
  return bindActionCreators({ updateProfile, plaidLogin }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(PlaidLoginPage));
