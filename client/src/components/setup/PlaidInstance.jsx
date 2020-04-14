import React from 'react';
import { Statistic, Row, Col, Popconfirm, Card  } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import "./SetupForm.css";

const PlaidInstance = props => {
    return (
      <Card>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Bank" value={props.bankName} />
            </Col>
            <Col span={12}>
              <Statistic title="Number of Accounts" value={props.accountNum} />
            </Col>
          </Row>
        </Card>
        <div className = "plaid-delete">
          <Popconfirm
            title="Are you sure delete this account?"
            okText="Yes"
            cancelText="No"
            onConfirm={props.onDelete}
          >
            <MinusCircleOutlined
              className="dynamic-delete-button"
            />
          </Popconfirm>
        </div>
    </Card>
    );
}

export default PlaidInstance