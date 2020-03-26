import React from "react";
import { Button, Input, Form } from "antd";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";

import "./Login.css";

const Login = props => {
  const onFinish = values => {
    console.log('Sent values:', values);
    props.onSubmit(values)
  };

  return (
    <Form
      name="login"
      className="input-form"
      onFinish={onFinish}
    >
      <Link to="/" className="login-sign-up" >
        <img src={require('../../assets/logo.png')} alt="logo" />
      </Link>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
         <Input type = "email"  placeholder="Email Account" />
      </Form.Item>


      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input  type = "password" placeholder="Password" />
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

      <Form.Item>
        <Link to="/register">Forget your password?</Link>
        <br/>
        <Link to="/register">Don't have an account? Sign up here.</Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
