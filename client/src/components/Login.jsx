import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({
        ...props.email,
        value: props.email.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
  onSubmit(props) {
    props.onSubmit();
  },
})(props => {
  const { getFieldDecorator, validateFields } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        props.onSubmit(values);
      }
    });
  };
  return (
    <Form name="normal_login" className="login-form" onSubmit={handleSubmit}>
      <Link to="/">
        <img src={require('../assets/logo.png')} alt="logo" />
      </Link>

      <h1>Login</h1>
      <Form.Item name="email" hasFeedback>
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            { required: true, message: 'Please input your email!' },
          ],
        })(
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            name="email"
          />
        )}
      </Form.Item>
      <Form.Item name="password" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Password is required!',
            },
            { min: 8, whitespace: true, message: 'Min length: 8' },
            // {
            //   pattern: new RegExp('^(?=.*d).{4,8}$'),
            //   message:
            //     'Password must be between 4 and 8 digits long and include at least one numeric digit.',
            // },
          ],
        })(
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            name="password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">Register now!</Link>
      </Form.Item>
    </Form>
  );
});

export default Login;
