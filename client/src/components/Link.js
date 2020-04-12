import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { PlaidLink } from 'react-plaid-link';
import { plaidLogin, plaidTransactions } from '../api/plaid.api';
import { PLAID_PRODUCT, PLAID_DEV_ENV, PLAID_PUlLIC_KEY } from '../constants';
import axios from 'axios';

class Link extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleOnSuccess(public_token, metadata) {
    console.log(public_token);
    // send token to client server
    // this.props.plaidLogin({
    //   email: this.props.email,
    //   token: this.props.token,
    // });
  }

  handleOnExit() {}

  handleClick(res) {
    this.props.plaidTransactions({
      email: this.props.user.email,
      access_token: this.props.user.token,
    });
    // axios.get('http://localhost:8000/plaid/transactions/').then(res => {
    //   this.setState({ transactions: res.data });
    //   console.log(res.data);
    // });
  }

  render() {
    return (
      <div>
        <PlaidLink
          clientName="Plaid Quickstart"
          env={PLAID_DEV_ENV}
          product={PLAID_PRODUCT}
          publicKey={PLAID_PUlLIC_KEY}
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div>
      </div>
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
  return bindActionCreators({ plaidTransactions }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Link));
// export default Link;
