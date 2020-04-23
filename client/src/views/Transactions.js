import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { USER_TOKEN } from '../constants';

import Transaction from '../components/dashboard/Transaction';

class Transactions extends Component {
  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { plaid } = this.props || {};
    const { transactions_each } = plaid || [];

    var account_tran = [];
    var { accountName } = this.props.match.params;
    const transactions = accountName ? [] : plaid.transactions;
    if (accountName) {
      if (transactions_each && transactions_each.length > 1) {
        transactions_each.forEach((account, idx) => {
          if (account.transactions && account.transactions.length > 0) {
            if (accountName === account.name.replace(/\s/g, '')) {
              account_tran = account.transactions;
              accountName = account.name;
            }
          }
        });
      }
    }

    return token ? (
      accountName ? (
        <Transaction account={accountName} transactions={account_tran} />
      ) : (
        <Transaction account="All Accounts" transactions={transactions} />
      )
    ) : (
      <Redirect to="/login" />
    );
  }
}

function mapStateToProps(state) {
  return { plaid: state.plaid };
}

export default connect(mapStateToProps, null)(withRouter(Transactions));
