import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout } from "antd";

import HeaderPage from "../components/header/Header";
import { login } from '../api/login.api';
import Login from '../components/login/Login';

import "./LoginPage.css";

const { Content, Footer } = Layout;

class LoginPage extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick = e => {
    console.log("Recieved values: ", e);
    this.props.login({
      email: e.username,
      password: e.password
    });
  };

  render() {
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Layout>
        <HeaderPage />
          <Content style={{ marginTop: "20vh" }}> 
          <div className = "login-center">
            <div role="presentation" className = "login-box">
              <Login 
                onClick={e => this.onClick(e)}
              />       
            </div>
          </div>
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
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(LoginPage));