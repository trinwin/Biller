import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { USER_TOKEN } from '../constants';

import Transaction from '../components/dashboard/Transaction';

class Transactions extends Component {
  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { plaid } = this.props || {};
    const { transactions } = plaid || [];

    return token && transactions && transactions.length > 0 ? (
      <Transaction transactions={transactions} />
    ) : (
      <Redirect to="login" />
    );
  }
}
function mapStateToProps(state) {
  return { plaid: state.plaid };
}

export default connect(mapStateToProps, null)(withRouter(Transactions));
