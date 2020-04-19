import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, CardFooter, Row, Col } from 'shards-react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { USER_TOKEN } from '../../constants';
import { changeDueDate, plaidBills } from '../../api/plaid.api';

const dateFormat = 'MM-DD';

class BillDueDate extends React.Component {
  constructor(){
    super( );
    this.state = {
      title: 'Bill Due Dates',
    };
  }

  componentDidMount () {
   
  }

  onDateChange = (item, dateString) => {
    const token = localStorage.getItem(USER_TOKEN);
    const { email } = this.props.user;
    const { name } = item;
    const date = moment().format("YYYY").toString() + "-" + dateString;

    this.props.changeDueDate({ account_name: name, due_date: date, email: email, token: token});
  }

  render() { 
    const accountDueDates = this.props.accountDueDates || [];

    return (
      <Card small>
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.state.title}</h6>
          <div className="block-handle" />
        </CardHeader>

        <CardBody className="p-0">
          <ListGroup small flush className="list-group-small">
            {(accountDueDates != null)? accountDueDates.map((item, idx) => (
              <ListGroupItem key={idx} className="d-flex px-3">
                <span className="text-semibold text-fiord-blue">{item.name}</span>
                <span className="ml-auto text-right text-semibold text-reagent-gray">
                  <DatePicker 
                    style = {{ width: 100 }}
                    format = { dateFormat }
                    defaultValue = { moment(item.date, dateFormat) }       
                    allowClear = { false }
                    onChange = {( _dateObj , datestring) => this.onDateChange(item, datestring)}
                  />
                </span>
              </ListGroupItem>
            )) : < span />}
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
function createDate(bankName, bankDate, dateSet){
  //const tempDate =  properties[1];
  //const tempSet =  properties[1];

  let tempDate;
  if(moment(bankDate, "YYYY-MM-DD").isValid())
    tempDate = moment(bankDate, "YYYY-MM-DD").format(dateFormat).toString()
  else
    tempDate = moment().format(dateFormat).toString();

  console.log(tempDate);

  return {
    name: bankName,
    date: tempDate,
    isSet: dateSet,
  };
}

// Store
function mapStateToProps(state) {
  const { bills } = state.plaid || [];
  let arr = [];

  if(bills != null && bills.length !== 0){
    Object.keys(bills).forEach(function(key) {
      let bankObj;

      Object.keys(bills[key]).forEach(function(key2) {
        bankObj = createDate(Object.getOwnPropertyNames(bills[key])[0], 
        bills[key][key2][1],
        bills[key][key2][2]);
      })

      arr.push(bankObj);
    });
  }

  return {
    user: state.user,
    plaid: state.plaid,
    accountDueDates: arr,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ plaidBills, changeDueDate }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(BillDueDate);
