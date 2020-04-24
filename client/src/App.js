import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RouterComponent from './router/RouterComponent';
import { setUserInfo } from './store/actions/auth.action';
import {
  USER_EMAIL,
  USER_TOKEN,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from './constants';

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
  getNotification,
} from './api/plaid.api';

class App extends Component {
  componentDidMount() {
    const email = localStorage.getItem(USER_EMAIL);
    const token = localStorage.getItem(USER_TOKEN);
    const user = { email, token };
    const first_name = localStorage.getItem(USER_FIRST_NAME);
    const last_name = localStorage.getItem(USER_LAST_NAME);

    if (token) {
      this.props.setUserInfo({ email, token, first_name, last_name });
      this.props.plaidTransactionsEach(user);
      this.props.plaidCategories(user);
      this.props.plaidTransactions(user);
      this.props.plaidNetWorth(user);
      this.props.plaidMonthlyExpenses(user);
      this.props.plaidMonthlyIncome(user);
      this.props.plaidBills(user);
      this.props.plaidGraphData(user);
    }
  }

  render() {
    const { user, plaid } = this.props || {};
    return (
      <div>
        <RouterComponent user={user} plaid={plaid} />
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
      getNotification,
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
