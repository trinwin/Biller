import React from 'react';
import { Card, CardHeader, CardBody } from 'shards-react';
import Chart from '../../utils/chart';

class MonthlyBills extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  renderChart = () => {
    const MonthlyExpenses = new Chart(this.canvasRef.current, {
      type: 'LineWithLine',
      data: this.props.data,
      options: this.props.chartOptions,
    });
    if (this.props.data.datasets > 1) {
      // They can still be triggered on hover.
      const buoMeta = MonthlyExpenses.getDatasetMeta(0);

      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[
        this.props.data.datasets[0].data.length - 1
      ]._model.radius = 0;

      // Render the chart.
      MonthlyExpenses.render();
    }
  };

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
          <h6 className="m-0">Monthly Expenses</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: '100% !important' }}
          />
        </CardBody>
      </Card>
    );
  }
}

export default MonthlyBills;
