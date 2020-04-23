import React from 'react';
import moment from 'moment';
import { Container, Row, Col, Card, CardBody, Badge } from 'shards-react';
import PageTitle from '../common/PageTitle';

const Transaction = props => {
  console.log('props: ', props);
  return props.transactions ? (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Transactions"
          subtitle={props.account}
          className="text-sm-left"
        />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0 text-center">
                      Number
                    </th>
                    <th scope="col" className="border-0">
                      Transaction
                    </th>
                    <th scope="col" className="border-0 text-center">
                      Amount
                    </th>
                    <th scope="col" className="border-0 text-center">
                      Category
                    </th>
                    <th scope="col" className="border-0 text-center">
                      Date
                    </th>
                    <th scope="col" className="border-0 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.transactions.map((transaction, idx) => (
                    <tr key={idx}>
                      <td className="text-center">{idx + 1}</td>
                      <td style={{ width: '550px' }}>{transaction.name}</td>
                      <td className="text-center">
                        {transaction.amount * -1 >= 0 ? (
                          <Badge theme="warning" className="mb-0 mr-0">
                            ${transaction.amount * -1}
                          </Badge>
                        ) : (
                          <Badge theme="success" className="mb-0 mr-0">
                            -${transaction.amount}
                          </Badge>
                        )}
                      </td>

                      <td className="text-center">{transaction.category}</td>
                      <td className="text-center">
                        {moment(transaction.date, 'YYYY-MM-DD')
                          .format('MM-DD-YY')
                          .toString()}
                      </td>
                      <td className="text-center">
                        {transaction.pending ? (
                          <Badge
                            outline
                            pill
                            theme="warning"
                            className="mb-0 mr-0"
                          >
                            Pending
                          </Badge>
                        ) : (
                          <Badge
                            outline
                            pill
                            theme="success"
                            className="mb-0 mr-0"
                          >
                            Complete
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Transaction;
