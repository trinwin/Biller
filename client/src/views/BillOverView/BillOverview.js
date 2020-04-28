import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Redirect, withRouter } from 'react-router-dom';

import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import SmallStats from '../../components/common/SmallStats';
import MonthlyBills from '../../components/dashboard/MonthlyBills';
import AccountBalances from '../../components/dashboard/AccountBalances';
import TopCategories from '../../components/dashboard/TopCategories';
import BillDueDate from '../../components/dashboard/BillDueDate';
import chartOptions from './BillOverViewHelper';

import {
  USER_TOKEN,
  PLAID_CHECKING,
  PLAID_SAVINGS,
  PLAID_CREDIT_CARD,
} from '../../constants';

class BillOverview extends Component {
  monthlyChart(monthly_expenses, monthly_income) {
    const chartLabels = monthly_expenses.map(money =>
      moment(money[0], 'MM-YY').format('MMM YY')
    );
    const expenseData = monthly_expenses.map(money => money[1].toFixed(0));

    const incomeData = monthly_income.map(money => money[1].toFixed(0));

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Expenses',
          fill: 'start',
          data: expenseData,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgba(255,65,105,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgba(255,65,105,1)',
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
        },
        {
          label: 'Income',
          fill: 'start',
          data: incomeData,
          pointBorderColor: 'rgba(0,123,255,1)',
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
    return chartData;
  }

  accountBalanceChart(transactions_each) {
    const data = [0, 0, 0];
    transactions_each.forEach((account, idx) => {
      switch (account.type) {
        case PLAID_CHECKING:
          data[0] += parseFloat(account.balance);
          break;
        case PLAID_SAVINGS:
          data[1] += parseFloat(account.balance);
          break;
        case PLAID_CREDIT_CARD:
          data[2] += parseFloat(account.balance) * -1;
          break;
        default:
          break;
      }
    });

    const accountBalanceChartData = {
      datasets: [
        {
          hoverBorderColor: '#ffffff',
          data: data,
          backgroundColor: [
            'rgba(0,123,255,0.9)',
            'rgba(0,123,255,0.5)',
            'rgba(0,123,255,0.3)',
          ],
        },
      ],
      labels: ['Checking', 'Savings', 'Credit Card'],
    };
    return accountBalanceChartData;
  }

  summaryStats(net_worth, accountNum, graph_data) {
    const smallStats = [
      {
        label: 'Net Worth',
        value: `$${net_worth.toFixed(0)}`,
        chartLabels: [],
        attrs: { md: '6', sm: '6' },
        datasets: [
          {
            borderWidth: 1.5,
            backgroundColor: 'rgba(0, 184, 216, 0.1)',
            borderColor: 'rgb(0, 184, 216)',
            data: [],
          },
        ],
      },
      {
        label: 'Number of Accounts',
        value: accountNum,
        chartLabels: [],
        attrs: { md: '6', sm: '6' },
        datasets: [
          {
            borderWidth: 1.5,
            backgroundColor: 'rgba(23,198,113,0.1)',
            borderColor: 'rgb(23,198,113)',
            data: [],
          },
        ],
      },
    ];

    graph_data.forEach(account => {
      switch (account.type) {
        case PLAID_CHECKING:
          const check_data = {
            label: 'Checking',
            value: `$${account.data[account.data.length - 1].toFixed(2)}`,
            chartLabels: account.data,
            attrs: { md: '4', sm: '6' },
            datasets: [
              {
                borderWidth: 1.5,
                backgroundColor: 'rgba(255,180,0,0.1)',
                borderColor: 'rgb(255,180,0)',
                data: account.data,
              },
            ],
          };
          smallStats.push(check_data);
          break;
        case PLAID_SAVINGS:
          const savings_data = {
            label: 'Savings',
            value: `$${account.data[account.data.length - 1].toFixed(2)}`,
            chartLabels: account.data,
            attrs: { md: '4', sm: '6' },
            datasets: [
              {
                borderWidth: 1.5,
                backgroundColor: 'rgba(255,65,105,0.1)',
                borderColor: 'rgb(255,65,105)',
                data: account.data,
              },
            ],
          };
          smallStats.push(savings_data);
          break;
        case PLAID_CREDIT_CARD:
          const credit_card_data = {
            label: 'Credit Card',
            value: `$${account.data[account.data.length - 1].toFixed(2)}`,
            chartLabels: account.data,
            attrs: { md: '4', sm: '6' },
            datasets: [
              {
                borderWidth: 1.5,
                backgroundColor: 'rgb(0,123,255,0.1)',
                borderColor: 'rgb(0,123,255)',
                data: account.data,
              },
            ],
          };
          smallStats.push(credit_card_data);
          break;
        default:
          break;
      }
    });
    return smallStats;
  }

  render() {
    const { plaid } = this.props || {};
    const { user } = this.props || {};
    const token = localStorage.getItem(USER_TOKEN);

    const graph_data = plaid.graph_data || [];

    /* */
    const net_worth = plaid.net_worth || 0;
    /* */
    const category_expense = plaid.category_expense || [];

    /* */
    const monthly_expenses = plaid.monthly_expenses || [];
    const monthly_income = plaid.monthly_income || [];
    const monthlyExpenseChartData = this.monthlyChart(
      monthly_expenses,
      monthly_income
    );

    /* */
    const transactions_each = plaid.transactions_each || [[0]];
    if (transactions_each.length > 1) {
      var accountBalanceChartData = this.accountBalanceChart(transactions_each);
      var accountNum = transactions_each.length;
    }
    const has_profile = user.has_profile || transactions_each.length;

    const smallStats = this.summaryStats(net_worth, accountNum, graph_data);

    return token ? (
      has_profile ? (
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
            {smallStats.map((stats, idx) => (
              <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                <SmallStats
                  id={`small-stats-${idx}`}
                  variation="1"
                  chartData={stats.datasets}
                  chartLabels={stats.chartLabels}
                  label={stats.label}
                  value={stats.value}
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
              <MonthlyBills
                data={monthlyExpenseChartData}
                chartOptions={chartOptions}
              />
            </Col>

            {/* All account balances*/}
            <Col lg="4" md="6" sm="12" className="mb-4">
              <AccountBalances chartData={accountBalanceChartData} />
            </Col>

            {/* Expenses by Category*/}
            <Col lg="3" md="12" sm="12" className="mb-4">
              <TopCategories category_expense={category_expense} />
            </Col>

            {/* All Bill Due Date */}
            <Col lg="4" md="12" sm="12" className="mb-4">
              <BillDueDate />
            </Col>
          </Row>
        </Container>
      ) : (
        <Redirect to="/setup" />
      )
    ) : (
      <Redirect to="/login" />
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
)(withRouter(BillOverview));
