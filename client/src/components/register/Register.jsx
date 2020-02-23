import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import "antd/dist/antd.css";

import "./Register.css";

const Register = props => {
  const onFinish = values => {
    console.log('Sent values:', values);
    props.onClick(values)
  };

  return (
    <Form
      name="register"
      className="register-form"
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
        rules={[{ required: true, message: 'You require a password!' }, 
        () => ({
          validator(rule, value) {
            if (value.length >= 6) {
              return Promise.resolve();
            }
            return Promise.reject('Your password must be 6 or more characters!');
          },
        }),]}
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

      <Form.Item>
        <Row>
          <Col span={12}>
          <Form.Item
            name="firstname"
            hasFeedback
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
             <Input placeholder="First Name" />
          </Form.Item>
          </Col>
          <Col span={12}> 
          <Form.Item
            name="lastname"
            hasFeedback
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          > 
            <Input placeholder="Last Name" />
          </Form.Item>
          </Col>
        </Row>
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
