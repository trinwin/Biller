import React from 'react';
import { Nav, NavLink, NavItem } from 'shards-react';

import Notifications from './Notifications';
import UserActions from './UserActions';

export default () => (
  <Nav navbar className="border-left flex-row">
    <NavItem className="border-right dropdown notifications">
      <NavLink active href="/dashboard" className="nav-link-icon text-center">
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">refresh</i>
        </div>
      </NavLink>
    </NavItem>
    <Notifications />
    <UserActions />
  </Nav>
);
