import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout, Form} from "antd";

import HeaderPage from "../components/header/Header";
import { login } from '../api/login.api';
import Login from '../components/login/Login';

import "./LoginPage.css";

const { Content, Footer, Sider } = Layout;
const LoginForm = Form.create({ name: 'login' })(Login);  

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      login_email: '',
      login_password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange = e => {
    this.setState(
        { 
          [e.target.id]: e.target.value 
        }
      );
  };

  onClick = e => {
    e.preventDefault();
    console.log("Values: ", this.state);
    this.props.login({
      email: this.state.login_email,
      password: this.state.login_password,
    });
  };

  render() {
    const email = { ...this.state.login_email };
    const password = { ...this.state.login_password };
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
              <LoginForm 
                onChange={e => this.onChange(e)}
                onClick={e => this.onClick(e)}
                email={email}
                password={password}
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
