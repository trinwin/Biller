import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { USER_TOKEN } from '../../constants';

import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import SmallStats from '../../components/common/SmallStats';
import MonthlyBills from '../../components/blog/MonthlyBills';
import UsersByDevice from '../../components/blog/UsersByDevice';
import TopCategories from '../../components/common/TopCategories';
import BillDueDate from '../../components/common/BillDueDate';

import chartOptions from './BillOverViewHelper';

class BillOverview extends Component {
  render() {
    const token = localStorage.getItem(USER_TOKEN);
    const { plaid } = this.props || {};
    const category_expense = plaid.category_expense || [];
    const bills = plaid.bills || [];
    // const transactions = plaid.transactions || [];
    // const net_worth = plaid.net_worth || -1;
    const monthly_expenses = this.props.monthly_expenses
      ? this.props.monthly_expenses
      : [
          ['100', 200],
          ['0', 200],
        ];
    // const monthly_expenses = plaid.monthly_expenses || [[0, 0]];
    console.log('monthly_expenses: ', monthly_expenses);

    const labels = monthly_expenses.map(money => money[0]);

    const data = monthly_expenses.map(money => money[1].toFixed(0));

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Expenses',
          fill: 'start',
          data,
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgba(0,123,255,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,
        },
      ],
    };

    return token ? (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Dashboard"
            subtitle="Biller"
            className="text-sm-left mb-3"
          />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {this.props.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={'20' || stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Bills Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <MonthlyBills data={chartData} chartOptions={chartOptions} />
          </Col>

          {/* Users by Device --> Category*/}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          {/* Top Bills*/}
          <Col lg="3" md="12" sm="12" className="mb-4">
            <TopCategories category_expense={category_expense} />
          </Col>

          {/* Top Bills2*/}
          <Col lg="3" md="12" sm="12" className="mb-4">
            <BillDueDate dueDates = {bills}/>
          </Col>
        </Row>
      </Container>
    ) : (
      <Redirect to="/errors" />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    plaid: state.plaid,
    monthly_expenses: state.plaid.monthly_expenses,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(BillOverview));

BillOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
};

BillOverview.defaultProps = {
  smallStats: [
    {
      label: 'Net Worth',
      value: '2,390',
      percentage: '4.7%',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: [],
        },
      ],
    },
    {
      label: 'Number of Accounts',
      value: '182',
      percentage: '12.4',
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: [1, 2, 3, 3, 3, 4, 4],
        },
      ],
    },
    {
      label: 'Checking',
      value: '8,147',
      percentage: '3.8%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: [2, 3, 3, 3, 4, 3, 3],
        },
      ],
    },
    {
      label: 'Savings',
      value: '29',
      percentage: '2.71%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: [1, 7, 1, 3, 1, 4, 8],
        },
      ],
    },
    {
      label: 'PG&E',
      value: '17,281',
      percentage: '2.4%',
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: '4', sm: '6' },
      datasets: [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [3, 2, 3, 2, 4, 5, 4],
        },
      ],
    },
  ],
};
