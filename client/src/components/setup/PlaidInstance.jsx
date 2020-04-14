import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';

import './SetupForm.css';

const PlaidInstance = props => {
  return (
    <Card>
      <Card>
        <Row gutter={19}>
          <Col span={12}>
            <Statistic title="Company" value={props.bankName} />
          </Col>
          <Col span={12}>
            <Statistic title="Number of Accounts" value={props.accountNum} />
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default PlaidInstance;
