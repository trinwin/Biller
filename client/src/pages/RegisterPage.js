import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Layout } from "antd";

import { register } from '../api/register.api';
import HeaderPage from "../components/header/Header";
import Register from '../components/register/Register';
import history from '../router/History';

import "./RegisterPage.css";


const { Content, Footer } = Layout;

class RegisterPage extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick = e => {
    history.push('/login');  
    // console.log("Recieved values: ", e);
    //  this.props.register({
    //    email: e.username,
    //    password: e.password
    // })
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
          <div className = "register-center">
            <div role="presentation" className = "register-box">
            <Register 
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
  return bindActionCreators({ register }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(RegisterPage));
