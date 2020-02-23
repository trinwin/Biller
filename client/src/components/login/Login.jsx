import React from "react";
import { Button, Input, Form, Checkbox } from "antd";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";

import "./Login.css";

const Login = props => {
  const onFinish = values => {
    console.log('Sent values:', values);
    props.onClick(values)
  };

  return (
    <Form
      name="login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item/>
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
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox /> Remember me 
        </Form.Item>

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

export default Login;
