import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
<<<<<<< HEAD
import { Layout } from "antd";

import HeaderPage from "../components/header/Header";
import { login } from '../api/login.api';
import Login from '../components/login/Login';

import "./LoginPage.css";

const { Content, Footer } = Layout;
=======

import { login } from '../api/login.api';
import Login from '../components/Login.js';
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347

class LoginPage extends Component {
  constructor() {
    super();
<<<<<<< HEAD
=======
    this.state = {
      email: '',
      password: '',
    };
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347

    this.onClick = this.onClick.bind(this);
  }

<<<<<<< HEAD
  onClick = e => {
    console.log("Recieved values: ", e);
    this.props.login({
      email: e.username,
      password: e.password
=======
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onClick = e => {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
    });
  };

  render() {
<<<<<<< HEAD
=======
    const email = { ...this.state.email };
    const password = { ...this.state.password };
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
    const user = this.props.user || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
<<<<<<< HEAD
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
=======
      <Login
        onChange={e => this.onChange(e)}
        onClick={e => this.onClick(e)}
        email={email}
        password={password}
      />
>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
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
