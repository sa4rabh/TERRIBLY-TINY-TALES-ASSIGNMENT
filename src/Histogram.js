import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { LinearScale } from 'chart.js';

Chart.register(LinearScale);

const Histogram = (props) => {
  const { histogramData } = props;

  // Extract the words and counts from the histogramData
  const labels = histogramData.map(([word, count]) => word);
  const data = histogramData.map(([word, count]) => count);

  // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Data',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Define the chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Histogram;
