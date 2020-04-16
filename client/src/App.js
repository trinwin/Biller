import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RouterComponent from './router/RouterComponent';
import { setUserInfo } from './store/actions/auth.action';
import { USER_EMAIL, USER_TOKEN } from './constants';

import {
  plaidTransactions,
  plaidTransactionsEach,
  plaidCategories,
  plaidNetWorth,
  plaidMonthlyExpenses,
  plaidBills,
} from './api/plaid.api';

class App extends Component {
  componentDidMount() {
    const email = localStorage.getItem(USER_EMAIL);
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      this.props.setUserInfo({ email, token });
      const { user } = this.props;
      this.props.plaidCategories({ user });
      this.props.plaidTransactions({ user });
      this.props.plaidTransactionsEach({ user });
      this.props.plaidNetWorth({ user });
      this.props.plaidMonthlyExpenses({ user });
      this.props.plaidBills({ user });
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
      plaidTransactions,
      plaidTransactionsEach,
      plaidCategories,
      plaidNetWorth,
      plaidMonthlyExpenses,
      plaidBills,
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
