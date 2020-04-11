import React, { Component } from 'react';
import { Statistic, Row, Col, Popconfirm, Card  } from 'antd';
import { PlaidLink } from 'react-plaid-link';
import { MinusCircleOutlined } from '@ant-design/icons';
import axios from "axios";

import "./SetupForm.css";

class PlaidInstance extends Component {

  constructor(){
    super();
    this.state = {
      type: "n/a",
      bankName: "none",
      accountName: "New account",
      accountType: "none",
      accountSetup: false,
    }

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(token, metadata) {
    console.log(token);
    console.log(metadata);
    this.setState({
      accountSetup: true, 
      bankName: metadata.institution.name,
      accountName: metadata.account.name,
      accountType: metadata.account.type,
    });
    // send token to client server
    // axios.post("http://localhost:8000/plaid/access-token/", {
    //   public_token: token
    // });
  }
  render(){
    const onEvent = (eventName, metadata) => console.log('onEvent', eventName, metadata);
    const onExit = (error, metadata) => console.log('onExit', error, metadata);

    return (
      <Card title={this.state.accountName}>
        { this.state.accountSetup ? (
          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Bank" value={this.state.bankName} />
              </Col>
              <Col span={12}>
                <Statistic title="Account type" value={this.state.accountType} />
              </Col>
            </Row>
          </Card>
        ) : (     
          <div className="plaid-div" >
            <PlaidLink
              className = "plaid-button"
              clientName = 'SJSU-Biller-Project'
              env = 'sandbox'
              product = {['auth', 'transactions']}
              publicKey = '716f1a504cda22791ca574fbcb4736'
              onSuccess = {this.onSuccess}
              onEvent = {onEvent}
              onExit={onExit}
            >
              Connect with Plaid
            </PlaidLink>
          </div>
        )}
        <div className = "plaid-delete">
          <Popconfirm
            title="Are you sure delete this account?"
            okText="Yes"
            cancelText="No"
          >
            <MinusCircleOutlined
              className="dynamic-delete-button"
            />
          </Popconfirm>
        </div>
    </Card>
    );
  }
}

export default PlaidInstance