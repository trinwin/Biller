import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RouterComponent from './router/RouterComponent';
import { setUserInfo } from './store/actions/auth.action';
import { USER_EMAIL, USER_TOKEN, ACCOUNTS_INFO } from './constants';

import { updateProfile } from './store/actions/auth.action';
import {
  plaidTransactions,
  plaidTransactionsEach,
  plaidCategories,
  plaidNetWorth,
  plaidMonthlyExpenses,
  plaidMonthlyIncome,
  plaidBills,
  plaidGraphData,
} from './api/plaid.api';

class App extends Component {
  componentDidMount() {
    const email = localStorage.getItem(USER_EMAIL);
    const token = localStorage.getItem(USER_TOKEN);
    const has_profile = localStorage.getItem(ACCOUNTS_INFO) ? true : false;

    if (token) {
      this.props.setUserInfo({ email, token });
      this.props.updateProfile({ has_profile });
      // if (has_profile) {
      const user = { email, token };
      this.props.plaidCategories(user);
      this.props.plaidTransactions(user);
      this.props.plaidTransactionsEach(user);
      this.props.plaidNetWorth(user);
      this.props.plaidMonthlyExpenses(user);
      this.props.plaidMonthlyIncome(user);
      this.props.plaidBills(user);
      this.props.plaidGraphData(user);
      // }
    }
  }
  render() {
    const user = this.props.user || {};
    return (
      <div>
        <RouterComponent user={user} />
      </div>
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
      setUserInfo,
      updateProfile,
      plaidTransactions,
      plaidTransactionsEach,
      plaidCategories,
      plaidNetWorth,
      plaidMonthlyExpenses,
      plaidMonthlyIncome,
      plaidBills,
      plaidGraphData,
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
