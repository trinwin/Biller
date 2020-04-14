import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, List, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PlaidLink } from 'react-plaid-link';
import { plaidLogin } from '../api/plaid.api';
import { updateProfile } from '../store/actions/auth.action';
import PlaidInstance from '../components/setup/PlaidInstance';
import {
  PLAID_PRODUCT,
  PLAID_SB_ENV,
  // PLAID_DEV_ENV,
  PLAID_PUlLIC_KEY,
} from '../constants';
import './Pages.css';

const { Content } = Layout;

class SetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      has_profile: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#F0F2F5';
  }

  onExit() {}

  onSuccess(public_token, metadata) {
    console.log(public_token);

    this.props.plaidLogin({
      email: this.props.user.email,
      token: this.props.user.token,
      public_token,
    });

    console.log('err: ' + this.props.plaid.errors);
    if (!this.props.plaid.errors) {
      this.props.updateProfile({ has_profile: true });
    }

    if (this.props.user.has_profile) {
      this.setState(previousState => ({
        forms: [
          ...previousState.forms,
          {
            accountNum: metadata.accounts.length,
            bankName: metadata.institution.name,
          },
        ],
      }));
    }
  }

  render() {
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
              dataSource={this.state.forms}
              renderItem={item => (
                <List.Item>
                  <PlaidInstance
                    bankName={item.bankName}
                    accountNum={item.accountNum}
                    onDelete={this.onDelete}
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
                env={PLAID_SB_ENV}
                product={PLAID_PRODUCT}
                publicKey={PLAID_PUlLIC_KEY}
                onSuccess={this.onSuccess}
                onExit={this.onExit}
              >
                <PlusOutlined /> Connect with Plaid
              </PlaidLink>
              {this.props.user.has_profile && (
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
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    plaid: state.plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile, plaidLogin }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(SetupForm));
