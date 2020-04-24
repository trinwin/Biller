import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';

const PlaidInstance = props => {
  return (
    <Card>
      <Card>
        <Row gutter={19}>
          <Col span={12}>
            <Statistic title="Account" value={props.bankName} />
          </Col>
          <Col span={12}>
            <Statistic title="Account Type" value={props.accountNum} />
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default PlaidInstance;
