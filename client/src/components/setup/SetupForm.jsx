import React, { Component } from 'react';
import { Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PlaidInstance from './PlaidInstance';
import './SetupForm.css';

class SetupForm extends Component {
  constructor() {
    super();
    this.state = {
      forms: [],
    };
  }

  componentDidMount() {
    //Load from database all user accounts
  }

  onAdd = () => {
    this.setState(previousState => ({
      forms: [...previousState.forms, {}],
    }));
  };

  render() {
    return (
      <div style={{ margin: '5%' }}>
        <List
          grid={{
            gutter: [48, 16],
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={this.state.forms}
          renderItem={item => (
            <List.Item>
              <PlaidInstance />
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          onClick={() => {
            this.onAdd();
          }}
          className="setup-button-form"
          size="large"
        >
          <PlusOutlined /> Add an account
        </Button>
      </div>
    );
  }
}

export default SetupForm;
