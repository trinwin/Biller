import React from 'react';
import { Button, Input, Form, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Register = props => {
  const onFinish = values => {
    props.onSubmission(values);
  };

  return (
    <Form name="register" className="input-form" onFinish={onFinish}>
      <Link to="/" className="register-sign-up">
        <img src={require('../assets/logo.png')} alt="logo" />
      </Link>
      <h2>Register</h2>
      <Form.Item
        name="email"
        hasFeedback
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 8, whitespace: true, message: 'Min length: 8' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value)
                return Promise.resolve();

              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="firstname"
              hasFeedback
              rules={[
                { required: true, message: 'Please enter your first name!' },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              hasFeedback
              rules={[
                { required: true, message: 'Please enter your last name!' },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-button">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
