import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { USER_TOKEN } from '../constants';
import { plaidTransactions } from '../api/plaid.api';

import Transaction from '../components/Transaction';

class Transactions extends Component {
  UNSAFE_componentWillMount() {
    const user = this.props.user;
    console.log('user: ', user);
    this.props.plaidTransactions({ user });
  }

  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { plaid } = this.props || {};
    console.log(`plaid: `, plaid);

    const { transactions } = plaid || [];
    console.log('tran: ', transactions);

    return token && transactions && transactions.length > 0 ? (
      <Transaction transactions={transactions} />
    ) : (
      <Redirect to="/errors" />
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    plaid: state.plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      plaidTransactions,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(Transactions));
