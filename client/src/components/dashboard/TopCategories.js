import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'shards-react';

const TopCategories = props => (
  <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Categories</h6>
      <div className="block-handle" />
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup small flush className="list-group-small">
        {props.category_expense.map((item, idx) => (
          <ListGroupItem key={idx} className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">
              {item.category}
            </span>
            <Badge
              theme="info"
              className="mb-0 mr-0 ml-auto text-right text-semibold "
            >
              ${item.total.toFixed(0)}
            </Badge>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>
  </Card>
);

export default TopCategories;
