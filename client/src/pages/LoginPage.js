import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../api/login.api';
import Login from '../components/Login.jsx';

class LoginPage extends Component {
  state = {
    fields: {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
    },
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

  handleFormSubmitSuccess = values => {
    console.log('values are ok', values);
    this.props.login({
      email: values.email,
      password: values.password,
    });
  };

  render() {
    const fields = this.state.fields;
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <div>
        <Login
          {...fields}
          onChange={this.handleFormChange}
          onSubmit={this.handleFormSubmitSuccess}
        />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
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
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(LoginPage));
