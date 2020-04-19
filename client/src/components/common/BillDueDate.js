import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
} from 'shards-react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { USER_TOKEN } from '../../constants';
import { changeDueDate, plaidBills } from '../../api/plaid.api';

const dateFormat = 'MM-DD';

class BillDueDate extends React.Component {
  componentDidMount() {}

  onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  };

  onDateChange = (item, value) => {
    const token = localStorage.getItem(USER_TOKEN);
    const { email } = this.props.user;
    const { name } = item;
    console.log('name: ', name);
    console.log('value: ', value.format('MM-DD'));

    const date =
      moment()
        .format('YYYY')
        .toString() +
      '-' +
      value.format('MM-DD').toString();

    console.log('date: ', date);

    this.props.changeDueDate({
      account_name: name,
      due_date: date,
      email: email,
      token: token,
    });
  };

  render() {
    const { plaid } = this.props || {};
    const { bills } = plaid || [];
    console.log('bills: ', bills);
    if (bills && bills.length > 0)
      console.log('bills: ', moment(bills[0].due_date, 'YYYY-MM-DD').isValid());

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Bill Due Dates</h6>
          <div className="block-handle" />
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup small flush className="list-group-small">
            {bills != null ? (
              bills.map((item, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">
                  <span className="text-semibold text-fiord-blue">
                    {item.name}
                  </span>
                  <span className="ml-auto text-right text-semibold text-reagent-gray">
                    {item.due_date ? (
                      <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        style={{ width: 120 }}
                        format={dateFormat}
                        defaultValue={moment(
                          moment(item.due_date, 'YYYY-MM-DD')
                            .format(dateFormat)
                            .toString(),
                          dateFormat
                        )}
                        allowClear={false}
                        onChange={this.onChange}
                        onOk={(item, value => this.onDateChange(item, value))}
                      />
                    ) : (
                      <DatePicker
                        showTime={{ format: 'HH:mm' }}
                        style={{ width: 120 }}
                        format={dateFormat}
                        allowClear={false}
                        onOk={(item, value => this.onDateChange(item, value))}
                      />
                    )}
                  </span>
                </ListGroupItem>
              ))
            ) : (
              <span />
            )}
          </ListGroup>
        </CardBody>

        <CardFooter className="border-top">
          <Row>
            {/* View All Due Dates */}
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">See all due dates &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

// Store
function mapStateToProps(state) {
  return {
    user: state.user,
    plaid: state.plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ plaidBills, changeDueDate }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BillDueDate);
