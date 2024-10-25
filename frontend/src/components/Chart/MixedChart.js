import { useRef } from 'react';
const chartContainer = useRef(null);
const context = chartContainer.current.getContext('2d');

new Chart(context, {
  type: 'bar',
  data: {
    datasets: [
      {
        label: 'Bar Dataset',
        data: [10, 20, 30, 40],
        // this dataset is drawn below
        order: 2,
      },
      {
        label: 'Line Dataset',
        data: [10, 10, 10, 10],
        type: 'line',
        // this dataset is drawn on top
        order: 1,
      },
    ],
    labels: ['January', 'February', 'March', 'April'],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

export default <canvas ref={chartContainer} />;
