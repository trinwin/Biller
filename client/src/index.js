import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './login.css';
import Login from './login';
import { Form } from "antd";

const LoginForm = Form.create({ name: 'normal_login' })(Login);  

ReactDOM.render(<LoginForm />, document.getElementById('root'));