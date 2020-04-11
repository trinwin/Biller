import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import { register } from '../api/register.api';
import SetupForm from '../components/setup/SetupForm';
import './Pages.css';

const { Content } = Layout;

class SetupPage extends Component {
  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Layout className="setup-form">
        <Content style={{ marginBottom: '54vh' }}>
          <SetupForm />
        </Content>
      </Layout>
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
  return bindActionCreators({ register }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(SetupPage));
