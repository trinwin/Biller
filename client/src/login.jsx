import React from "react";
import { Layout, Button, Input, Row, Col, Form, Icon, Checkbox } from "antd";
import HeaderPage from "./header";
import "antd/dist/antd.css";
import "./index.css";

const { Content, Footer } = Layout;

class Login extends React.Component {
  handleClick = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      } else {
        console.log("Received invalid form.");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        <HeaderPage />
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ padding: "2vh" }} />
          <Row>
            <Col xs={2} sm={4} md={6} lg={7} xl={6} />
            <Col xs={20} sm={16} md={12} lg={10} xl={12}>
              <div style={{ background: "#fff", padding: 24, height: "80vh" }}>
                <div style={{ padding: "5vh" }} />
                <Form onSubmit = {this.handleClick} className = "login-form">
                  <Form.Item>
                    {getFieldDecorator("email account", {
                      rules: [{ required: true, message: "Please input your email account!"}]
                    })(
                      <Input prefix={ <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> } placeholder="Email Account" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [ { required: true, message: "Please input your Password!" } ]
                    })(
                      <Input prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} /> } type="password" placeholder="Password" />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: false
                    })(<Checkbox>Remember me</Checkbox>)}

                    <a className="login-forgot" href="">
                      Forgot your password?
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-button"
                    >
                      Log in
                    </Button>
                  </Form.Item>

                  <Form.Item className = "login-sign-up">
                    <a href="">
                      Don't have an account? Sign up here.
                    </a>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col xs={2} sm={4} md={6} lg={7} xl={6} />
          </Row>
        </Content>

        <Footer style={{ textAlign: "center" }}>Copyrights reserved by whatever I think I don't know.</Footer>
      </Layout>
    );
  }
}

export default Login;
