import { chartTooltip } from './util';

export const lineChartOptions = {
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: chartTooltip,
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
          borderDash: [4, 2],
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          min: 50,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};
export const polarAreaChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false,
    },
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
  tooltips: chartTooltip,
};

export const areaChartOptions = {
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: chartTooltip,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          min: 50,
          max: 70,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export const scatterChartOptions = {
  legend: {
    position: 'right',
    display: true,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          min: -80,
          max: 80,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
        },
      },
    ],
  },
  tooltips: chartTooltip,

  // legend: {
  //   position: 'right',
  display: false,
  //   labels: {
  //     padding: 30,
  //     usePointStyle: true,
  //     fontSize: 12,
  //   },
  // },
  // responsive: true,
  // maintainAspectRatio: false,
  // scales: {
  //   yAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //         drawBorder: false,
  //       },
  //       ticks: {
  //         beginAtZero: true,
  //         stepSize: 20,
  //         min: -80,
  //         max: 80,
  //         padding: 20,
  //       },
  //     },
  //   ],
  //   xAxes: [
  //     {
  //       gridLines: {
  //         display: true,
  //         lineWidth: 1,
  //         color: 'rgba(0,0,0,0.1)',
  //       },
  //     },
  //   ],
  // },
};

export const barChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
          borderDash: [4, 2],
        },
        ticks: {
          beginAtZero: true,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: chartTooltip,
};

export const resourceBarChartOptions = {
  legend: {
    position: 'top',
    display: true,
    labels: {
      padding: 30,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
          borderDash: [4, 2],
        },
        ticks: {
          beginAtZero: true,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: chartTooltip,
};

export const stackChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          stacked: true,
          display: true,
          lineWidth: 1,
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false,
          borderDash: [4, 2],
        },
        ticks: {
          beginAtZero: true,
          padding: 20,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
      },
    ],
  },
  tooltips: chartTooltip,
};

export const radarChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      display: false,
    },
  },
  tooltips: chartTooltip,
};

export const pieChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  layout: {
    padding: {
      right: 20,
    },
  },
  tooltips: chartTooltip,
};

export const resourcePieChartOptions = {
  legend: {
    position: 'bottom',
    display: true,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  layout: {
    padding: {
      right: 20,
    },
  },
  tooltips: chartTooltip,
};

export const doughnutChartOptions = {
  legend: {
    position: 'right',
    display: false,
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  cutoutPercentage: 80,
  layout: {
    padding: {
      right: 20,
    },
  },
  tooltips: chartTooltip,
};

export const smallLineChartOptions = {
  layout: {
    padding: {
      left: 5,
      right: 5,
      top: 10,
      right: 10,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        display: false,
        borderDash: [4, 2],
      },
    ],
    xAxes: [
      {
        display: false,
      },
    ],
  },
};
