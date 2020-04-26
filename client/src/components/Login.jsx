import React from 'react';
import { Link } from 'react-router-dom';
// import '@ant-design/compatible/assets/index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = props => {
  const onFinish = values => {
    console.log('Sent values:', values);
    props.onClick(values);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Link to="/">
        <img src={require('../assets/logo.png')} alt="logo" />
      </Link>

      <h2>Login</h2>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        hasFeedback
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          name="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 8, whitespace: true, message: 'Min length: 8' },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          name="password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        Or <Link to="/register">Register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
