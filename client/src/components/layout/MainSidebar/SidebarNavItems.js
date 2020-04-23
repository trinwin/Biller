import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Nav } from 'shards-react';

import SidebarNavItem from './SidebarNavItem';
import { Store } from '../../../flux';

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: Store.getSidebarItems(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems(),
    });
  }

  render() {
    const { navItems: items } = this.state;
    const { plaid } = this.props || {};
    const transactions_each = plaid.transactions_each || [[0]];
    const sideNavAccounts = [
      {
        name: 'All Accounts',
        path: '/transactions/',
      },
    ];

    if (transactions_each && transactions_each.length > 1) {
      transactions_each.forEach(account => {
        if (account.transactions && account.transactions.length > 0) {
          const newAccount = {
            name: account.name,
            path: '/transactionsEach/' + account.name.replace(/\s/g, ''),
          };
          sideNavAccounts.push(newAccount);
        }
      });
    }

    if (items[1].title === 'Transactions') {
      items[1] = {
        ...items[1],
        sideNavAccounts,
      };
    }

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    plaid: state.plaid,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(SidebarNavItems));
