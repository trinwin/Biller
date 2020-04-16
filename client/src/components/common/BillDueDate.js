import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  Button,
} from 'shards-react';
import { DatePicker } from 'antd';
import moment from 'moment';
import update from 'immutability-helper';

const dateFormat = 'MM/DD';


class BillDueDate extends React.Component {
  constructor(){
    super();

    this.state = {
      title: 'Bill Due Dates',
      accountDueDates: [ 
        {
          name: 'Chase Test Credit',
          key: null,
          date: '12/2',
        },
        {
          name: 'Chase Test Credit VIP',
          key: null,
          date: '5/2',
        },
        {
          name: 'PG&E Test',
          key: null,
          date: '6/2',
        },
      ],
    }

    this.onDateChange = this.onDateChange.bind(this);
    this.onDateUpdate = this.onDateUpdate.bind(this);
  }

  componentDidMount () {

  }

  onDateChange = (index, dateString) => {
    console.log(index + " " + dateString);
    this.setState(update(this.state.accountDueDates[index], {date: {$set: dateString }}));
  }

  onDateUpdate = () => {
    console.log(this.state.accountDueDates);
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

export default BillDueDate;
