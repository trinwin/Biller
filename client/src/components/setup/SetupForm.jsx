import React, { Component } from "react";
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PlaidLink } from 'react-plaid-link';
import axios from "axios";

import  PlaidInstance from "./PlaidInstance"
import "./SetupForm.css"

class SetupForm extends Component {
  constructor() {
    super();
    this.state = {
      forms: [{
        accountName: "Name",
        accountNum: "123",
        bankName: "Test Bank",
      }]
    }

    this.onSuccess = this.onSuccess.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    // Load from database all user accounts
    document.body.style.backgroundColor = "#F0F2F5";
  }

  onDelete = () => {
    // Delete Function
    console.log("Deleted!");
  }

  onSuccess(token, metadata) {
    console.log(token);
    console.log(metadata);

    this.setState(previousState => ({
      forms: [...previousState.forms, {
        accountName: metadata.account.name,
        accountNum: metadata.accounts.length,
        bankName: metadata.institution.name,
      }]
    }));

    // send token to client server

    /* uncomment to restore axios post
    axios.post("http://localhost:8000/plaid/access-token/", {
        public_token: token
    }); 
      */
  }

  render(){
    return (

    <div style={{margin:"5vh"}} >
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
            <PlaidInstance
              accountName = {item.accountName}
              bankName = {item.bankName}
              accountNum = {item.accountNum}
              onDelete = {this.onDelete}
            />
          </List.Item>
        )}
      />
      <div className="plaid-div" >
        <PlaidLink
          style={{ padding: '20px', fontSize: '16px', cursor: 'pointer', border: 'dashed 2px rgb(120, 120, 120)' }}
          clientName = 'SJSU-Biller-Project'
          env = 'sandbox'
          product = {['auth', 'transactions']}
          publicKey = '716f1a504cda22791ca574fbcb4736'
          onSuccess = {this.onSuccess}
        >
          <PlusOutlined /> Connect with Plaid
        </PlaidLink>
      </div>
    </div>
    );
  }
}

export default SetupForm;

