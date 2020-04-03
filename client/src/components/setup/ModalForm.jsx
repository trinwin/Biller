import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import './SetupForm.css';

const ModalForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Modal
      visible={visible}
      title="Log into account"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="account-form"
        className="setup-input-form"
      >
        <img src={require('../../assets/logo.png')} alt="logo" />

        <Form.Item
          name="type"
          rules={[{ required: true, message: 'Select a Login Type' }]}
        >
          <Select placeholder="Type" style={{ width: 200 }}>
            <Option value="PGE">{'PG&E'}</Option>
            <Option value="CHASE">Chase</Option>
            <Option value="BOFA" disabled>
              Bank of America
            </Option>
            <Option value="WATER">San Jose Water</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email Account" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
