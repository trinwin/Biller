import React from "react";
import { Button, Input, Form, Icon, Checkbox } from "antd";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";

import "./Login.css";

class Login extends React.Component {
  handleClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       console.log(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className = "login-form" onSubmit = {this.props.onClick}>
        <Form.Item/>
        <Form.Item onChange={this.props.onChange} value={this.props.email.value}>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email account!"}]
          })(
            <Input prefix={ <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> } placeholder="Email Account" />
          )}
        </Form.Item>
        <Form.Item onChange={this.props.onChange} value={this.props.password.value}>
          {getFieldDecorator("password", {
            rules: [ { required: true, message: "Please input your Password!" } ]
          })(
            <Input prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> } type="password" placeholder="Password" />
          )}
        </Form.Item>

        <Form.Item>
          <Checkbox/> Remember me

          <Link to="/register" className = "login-forgot">Forget your password?</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
          > 
            Sign in
          </Button>
        </Form.Item>

        <Form.Item className = "login-sign-up">
          <Link to="/register">Don't have an account? Sign up here.</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
