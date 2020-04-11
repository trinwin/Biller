import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout, Steps } from 'antd';

import { register } from '../api/register.api';
import SetupForm from '../components/setup/SetupForm';
import './Pages.css';

const { Content, Sider } = Layout;
const { Step } = Steps;

class SetupPage extends Component {
  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Layout className="input-form2">
        <Sider theme="light">
          <Steps direction="vertical" current={1}>
            <Step
              title="Finished"
              description="You've registered a Biller account!"
            />
            <Step title="In Progress" description="Link accounts." />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        </Sider>
        <Content>
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
