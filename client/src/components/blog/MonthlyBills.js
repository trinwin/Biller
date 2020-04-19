import React from 'react';

import { Row, Col, Card, CardHeader, CardBody, Button } from 'shards-react';

import RangeDatePicker from '../common/RangeDatePicker';
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
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            </Col>
          </Row>
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
