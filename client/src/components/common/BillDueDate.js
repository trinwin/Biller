import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, 
  CardFooter, Row, Col, Button
} from 'shards-react';
import { DatePicker } from 'antd';
import moment from 'moment';
import update from 'immutability-helper';
import { changeDueDate } from '../../api/plaid.api';

const dateFormat = 'MM/DD';


class BillDueDate extends React.Component {
  constructor( bills ){
    super( bills );
    
    this.state = {
      title: 'Bill Due Dates',
      accountDueDates: getDates(bills),
    };
  }

  onDateChange = (index, dateString) => {
    console.log(index + " " + dateString);
    this.setState(update(this.state.accountDueDates[index], {date: {$set: dateString }}));
  }

  onDateUpdate = () => {
    console.log(this.state.accountDueDates);
    this.props.changeDueDate(this.state.accountDueDates);
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
            {/* Update Button */}
            <Col>
              <Button theme="primary" className="mb-2 mr-1" onClick = {this.onDateUpdate}>
                Update
              </Button>
            </Col>

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
      name: bills[i].name,
      date: bills[i].date, 
      setDate: bills[i].setDate 
    };

    arr.push(bankDateObj);
  }

  const bankDateObj = {
    name: "TEST",
    date: "5/5",
    setDate: false,
  };


  arr.push(bankDateObj);
  
  return arr;
}

// Store
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ changeDueDate }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(BillDueDate));
