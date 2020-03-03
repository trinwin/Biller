import React from "react";
import { Button, Input, Form, Checkbox } from "antd";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";

import "./Register.css";

const Register = props => {
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
        hasFeedback
        rules={[ () => ({
            validator(rule, value) {
              if (/.+@.+\..+/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('Your email is not valid!');
            },
          }),
        ]}
      >
         <Input type = "email"  placeholder="Email Account" />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'You require a password!' }]}
      >
        <Input type = "password" placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[ {required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input type = "password" placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'Please enter your name!' }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>

      <Form.Item/>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-button"
        > 
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
