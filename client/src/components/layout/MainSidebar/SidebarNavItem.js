import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink as RouteNavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react';

class SidebarNavItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      open: !this.state.open,
    });
  }
  onClick() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { item } = this.props;

    return (
      <NavItem>
        {!item.sideNavAccounts ? (
          <NavLink tag={RouteNavLink} to={item.to}>
            {item.htmlBefore && (
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
              />
            )}
            {item.title && <span>{item.title}</span>}
            {item.htmlAfter && (
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
              />
            )}
          </NavLink>
        ) : (
          <Dropdown open={this.state.open} toggle={this.toggleDropdown}>
            <DropdownToggle nav caret>
              {item.htmlBefore && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                />
              )}
              {item.title && <span>{item.title}</span>}
              {item.htmlAfter && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                />
              )}
            </DropdownToggle>
            <DropdownMenu>
              {item.sideNavAccounts.map((account, idx) => (
                <Link key={idx} to={account.path} className="p-0 b-0">
                  <DropdownItem
                    className="border-top-0"
                    onClick={this.toggleDropdown}
                  >
                    <span>{account.name}</span>
                  </DropdownItem>
                </Link>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavItem>
    );
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object,
};

export default SidebarNavItem;
