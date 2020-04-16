const chartOptions = {
  ...{
    responsive: true,
    legend: {
      position: 'top',
    },
    elements: {
      line: {
        // A higher value makes the line look skewed at this ratio.
        tension: 0.3,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: false,
          ticks: {
            callback(tick, index) {
              return index === 0 ? '' : tick;
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            suggestedMax: 1000,
            callback(tick) {
              if (tick === 0) {
                return tick;
              }
              // Format the amounts using Ks for thousands.
              return tick > 9999 ? `$${(tick / 1000).toFixed(1)}K` : `$${tick}`;
            },
          },
        },
      ],
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    tooltips: {
      custom: false,
      mode: 'nearest',
      intersect: false,
    },
  },
};

export default chartOptions;
