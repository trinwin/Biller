import React from 'react';

import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';

const Transaction = props => {
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Transastions"
          subtitle="Bank"
          className="text-sm-left"
        />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">...</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Number
                    </th>
                    <th scope="col" className="border-0">
                      Transaction
                    </th>
                    <th scope="col" className="border-0">
                      Category
                    </th>
                    <th scope="col" className="border-0">
                      Date
                    </th>
                    <th scope="col" className="border-0">
                      Amount
                    </th>
                    <th scope="col" className="border-0">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.transactions.map((transaction, idx) => (
                    <tr>
                      <td>{idx + 1}</td>
                      <td style={{ width: '550px' }}>{transaction.name}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.date}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.pending ? 'Pending' : 'Completed'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Transaction;
