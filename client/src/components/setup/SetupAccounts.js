import React from 'react';

import { Link } from 'react-router-dom';
import { PlaidLink } from 'react-plaid-link';
import { Layout, List, Button } from 'antd';
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
            dataSource={props.forms}
            renderItem={item => (
              <List.Item>
                <PlaidInstance
                  bankName={item.bankName}
                  accountNum={item.accountNum}
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
                  className="connect-dashboard-btn"
                >
                  Proceed to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default SetupAccounts;
