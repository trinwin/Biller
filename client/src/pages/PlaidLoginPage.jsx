import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { plaidLogin } from '../api/plaid.api';
import SetupAccount from '../components/setup/SetupAccounts';
import { updateProfile } from '../store/actions/auth.action';
import { USER_TOKEN } from '../constants';

import './Pages.css';

class SetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
    };
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

    this.props.plaidLogin({
      email,
      token,
      public_token,
    });

    console.log('plaid.errors: ' + plaid.errors);
    if (!plaid.errors) {
      this.props.updateProfile({ has_profile: true });
    }

    if (this.props.user.has_profile) {
      this.setState(previousState => ({
        forms: [
          ...previousState.forms,
          {
            accountNum: metadata.accounts.length,
            bankName: metadata.institution.name,
          },
        ],
      }));
    }
  }

  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { user } = this.props;
    const { forms } = this.state;
    console.log('forms: ', forms);
    return token ? (
      <SetupAccount
        form={forms}
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
)(withRouter(SetupForm));
