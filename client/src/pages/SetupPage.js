import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout } from "antd";

import { register } from '../api/register.api';
import HeaderPage from "../components/header/Header";

import "./RegisterPage.css";


const { Content, Footer } = Layout;

class SetupPage extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Layout>
        <HeaderPage />
        <Content style={{ marginTop: "20vh" }}> 
          <p>Test!</p> 
        </Content>
        <Footer style={{ textAlign: "center" }}>Copyrights reserved by whatever I think I don't know.</Footer>
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
