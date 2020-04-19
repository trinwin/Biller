import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
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
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              ${item.total.toFixed(0)}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>
  </Card>
);

TopCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array,
};

TopCategories.defaultProps = {
  title: 'Top Categories',
  referralData: [
    {
      title: 'Shopping',
      value: '$1,291',
    },
    {
      title: 'Travel',
      value: '$1,291',
    },
    {
      title: 'Food',
      value: '$1,291',
    },
    {
      title: 'Utilities',
      value: '$1,291',
    },
  ],
};

export default TopCategories;
