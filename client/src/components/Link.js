import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
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
    axios.post('http://localhost:8000/plaid/access-token/', {
      public_token: public_token,
    });
  }

  handleOnExit() {}

  handleClick(res) {
    axios.get('http://localhost:8000/plaid/transactions/').then(res => {
      this.setState({ transactions: res.data });
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <PlaidLink
          clientName="Plaid Quickstart"
          env="sandbox"
          product={['auth', 'transactions']}
          publicKey="716f1a504cda22791ca574fbcb4736"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
          countryCodes={['US']}
          apiVersion="v2"
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

export default Link;
