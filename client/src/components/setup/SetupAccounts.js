import React from 'react';

import { Link } from 'react-router-dom';
import { PlaidLink } from 'react-plaid-link';
import { Layout, List } from 'antd';
import { Button } from 'shards-react';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {
  PLAID_PRODUCT,
  // PLAID_SB_ENV,
  PLAID_DEV_ENV,
  PLAID_PUlLIC_KEY,
} from '../../constants';

import PlaidInstance from './PlaidInstance';
import './setup.css';

const { Content } = Layout;

const SetupAccounts = props => {
  return (
    <div style={{ margin: '5vh' }}>
      <Layout className="setup-form">
        <Content style={{ marginBottom: '54vh' }}>
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
            dataSource={props.accountsInfo}
            renderItem={account => (
              <List.Item>
                <PlaidInstance
                  bankName={account.name}
                  accountNum={account.type}
                />
              </List.Item>
            )}
          />
          <div className="plaid-div">
            <PlaidLink
              style={{
                padding: '14px',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'dashed 2px rgb(120, 120, 120)',
              }}
              clientName="SJSU-Biller"
              env={PLAID_DEV_ENV}
              product={PLAID_PRODUCT}
              publicKey={PLAID_PUlLIC_KEY}
              onSuccess={props.onSuccess}
            >
              <PlusOutlined /> Connect with Plaid
            </PlaidLink>
            {props.has_profile && (
              <Link to="/dashboard">
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  size="large"
                  className="connect-dashboard-btn text-center"
                >
                  Proceed to Dashboard
                </Button>
              </Link>
            )}
            <Button
              type="success"
              size="large"
              className="connect-dashboard-btn"
              onClick={props.logout}
            >
              <i class="material-icons">&#xE879;</i> Logout
            </Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default SetupAccounts;
