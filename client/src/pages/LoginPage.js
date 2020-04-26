import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../api/login.api';
import {
  plaidTransactions,
  plaidTransactionsEach,
  plaidCategories,
  plaidNetWorth,
  plaidMonthlyExpenses,
  plaidMonthlyIncome,
  plaidBills,
  plaidGraphData,
} from '../api/plaid.api';
import Login from '../components/Login.jsx';
import '../components/static/style.js';
import { USER_TOKEN } from '../constants';

const LoginPage = props => {
  const onClick = values => {
    const { email, password } = values;

    props.login({ email, password }).then(() => {
      const token = localStorage.getItem(USER_TOKEN);
      const user = { token, email };
      props.plaidTransactionsEach(user);
      props.plaidCategories(user);
      props.plaidTransactions(user);
      props.plaidNetWorth(user);
      props.plaidMonthlyExpenses(user);
      props.plaidMonthlyIncome(user);
      props.plaidBills(user);
      props.plaidGraphData(user);
    });
  };

  const user = props.user || {};
  const { token, has_profile } = user;

  return token ? (
    has_profile ? (
      <Redirect to="/dashboard" user={user} />
    ) : (
      <Redirect to="/setup" user={user} />
    )
  ) : (
    <Login onClick={e => onClick(e)} />
  );
};

// Store
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
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

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(LoginPage));
