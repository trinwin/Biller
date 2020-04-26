import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotification } from '../../../../api/plaid.api';
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from 'shards-react';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { plaid } = this.props || {};
    const { notifications } = plaid || [];
    console.log('notifications: ', notifications);

    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            {notifications && (
              <Badge pill theme="danger">
                {notifications.length}
              </Badge>
            )}
          </div>
        </NavLink>
        {notifications && (
          <Collapse
            open={this.state.visible}
            className="dropdown-menu dropdown-menu-small"
          >
            {notifications.map((notification, idx) => (
              <DropdownItem key={idx}>
                <div className="notification__icon-wrapper">
                  <div className="notification__icon">
                    <i className="material-icons">event</i>
                  </div>
                </div>
                <div className="notification__content">
                  <span className="notification__category">
                    Due Date Reminder
                  </span>
                  <p>{notification.message}</p>
                </div>
              </DropdownItem>
            ))}
            <DropdownItem className="notification__all text-center">
              View all Notifications
            </DropdownItem>
          </Collapse>
        )}
      </NavItem>
    );
  }
}

function mapStateToProp(state) {
  const { user, plaid } = state;
  return {
    user,
    plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getNotification }, dispatch);
}

export default connect(mapStateToProp, matchDispatchToProps)(Notifications);
