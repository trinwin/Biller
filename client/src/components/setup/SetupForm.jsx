import React, { Component } from 'react';
import { Form, Button, Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SetupFormInstance from './SetupFormInstance';
import './SetupForm.css';

const columnlayout = {
  wrapperCol: {
    xs: { span: 10, offset: 9 },
    sm: { span: 10, offset: 9 },
  },
};

class SetupForm extends Component {
  constructor() {
    super();
    this.state = {
      btnName: 'TEST',
      foo: true,
    };
  }

  render() {
    return (
      <Form
        name="account_form_modal"
        {...columnlayout}
        style={{ margin: '25vh' }}
      >
        <Form.List name="names">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      noStyle
                    >
                      <SetupFormInstance
                        btnName={
                          'Button ' + field.key + ' ' + this.state.btnName
                        }
                        style={{ size: '50px' }}
                      />
                    </Form.Item>
                    <span style={{ padding: '2%' }}>
                      <Popconfirm
                        title="Are you sure delete this account?"
                        onConfirm={() => {
                          remove(field.name);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <MinusCircleOutlined className="dynamic-delete-button" />
                      </Popconfirm>
                    </span>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '60%' }}
                  >
                    <PlusOutlined /> Add an account
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    );
  }
}

export default SetupForm;
