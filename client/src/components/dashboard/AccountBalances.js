import React from 'react';
import { Card, CardHeader, CardBody } from 'shards-react';

import Chart from '../../utils/chart';

class AccountBalances extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  renderChart() {
    const chartConfig = {
      type: 'pie',
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: 'bottom',
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: 'index',
            position: 'nearest',
          },
        },
        ...this.props.chartOptions,
      },
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  componentDidUpdate() {
    this.renderChart();
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Account Balances</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
      </Card>
    );
  }
}

export default AccountBalances;
