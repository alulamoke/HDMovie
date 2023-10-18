import React from 'react';
import { Line } from 'react-chartjs-2';

const MovieStreamingChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'No of watched Series per month',
        data: [1200, 8000, 1500, 950, 10000],
        borderColor: ['rgba(220,53,86,0.5)'],
        backgroundColor: ['rgba(220,53,86,0.5)'],
        pointBorderColor: ['rgba(220,53,86,0.5)'],
        pointBackgroundColor: ['rgba(220,53,86,0.5)'],
      },
      {
        label: 'No of watched movies per month',
        data: [10000, 11000, 15266, 9580, 50000],
        borderColor: ['rgba(23,162,184,0.5)'],
        backgroundColor: ['rgba(23,162,184,0.5)'],
        pointBorderColor: ['rgba(23,162,184,0.5)'],
        pointBackgroundColor: ['rgba(23,162,184,0.5)'],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default MovieStreamingChart;
