import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, CardFooter, Row, Col } from 'shards-react';
import { DatePicker } from 'antd';
import moment from 'moment';
import update from 'immutability-helper';
import { changeDueDate } from '../../api/plaid.api';

const dateFormat = 'MM-DD';

class BillDueDate extends React.Component {
  constructor( bills, email ){
    super( bills );
    
    this.state = {
      title: 'Bill Due Dates',
      accountDueDates: getDates(bills, email),
    };
  }

  onDateChange = (index, dateString) => {
    const { email } = this.props.user;
    const account_name = this.state.accountDueDates[index].name;
    const due_date = moment().format("YYYY").toString() + dateString;

    this.setState(update(this.state.accountDueDates[index], {date: {$set: dateString }}));

    this.props.changeDueDate({account_name, due_date, email});
  }

  render() { 
    return (
      <Card small>
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.state.title}</h6>
          <div className="block-handle" />
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup small flush className="list-group-small">
            {this.state.accountDueDates.map((item, idx) => (
              <ListGroupItem key={idx} className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">{item.name}</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  <DatePicker 
                    style = {{ width: 100 }}
                    format = { dateFormat }
                    defaultValue = { moment(item.date, dateFormat) }       
                    allowClear = { false }
                    onChange = {( _dateObj , datestring) => this.onDateChange(idx, datestring)}
                  />
                </span>
              </ListGroupItem>
            ))}
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
};

// Get Bills from constructor
function getDates(bills){
  const iter = (bills.length > 3)? 3 : bills.length;
  let arr = [];
  
  for(let i=0; i<iter; i += 1){
    const bankDateObj = {
      name: bills[i],
      date: bills[i][1], 
      setDate: bills[i][2] 
    };

    if(bankDateObj.date == null)
      bankDateObj.date = moment().format(dateFormat).toString();

    arr.push(bankDateObj);
  }

  const bankDateObj = {
    name: "TEST",
    date: moment().format(dateFormat).toString(),
    setDate: false,
  };

  arr.push(bankDateObj);
  
  return arr;
}

// Store
function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ changeDueDate }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(BillDueDate);
