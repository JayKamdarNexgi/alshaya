import { ThemeColors } from '../Chart/ThemeColors';

const colors = ThemeColors();

export const lineChartData = {
  labels: ['June', 'July', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    {
      label: 'Customer Count',
      data: [50, 55, 60, 65, 72, 80, 82],
      borderColor: colors.bs_blue,
      borderWidth: 0.5,
      pointBackgroundColor: colors.bs_blue,
      pointBorderColor: colors.bs_blue_light,
      pointHoverBackgroundColor: colors.bs_blue,
      pointHoverBorderColor: colors.bs_blue,
      pointRadius: 6,
      pointBorderWidth: 0.4,
      pointHoverRadius: 8,
      borderDash: [10, 5],
      fill: false,
    },
  ],
};

export const polarAreaChartData = {
  labels: ['USA', 'Africa', 'Asia'],
  datasets: [
    {
      data: [80, 90, 70],
      borderWidth: 2,
      borderColor: [colors.bs_blue, colors.themeColor2, colors.themeColor3],
      backgroundColor: [
        colors.bs_blue,
        colors.themeColor2_10,
        colors.themeColor3_10,
      ],
    },
  ],
};

export const areaChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'New Jira Ticket',
      data: [54, 63, 60, 65, 60, 68, 60],
      borderColor: colors.bs_indigo,
      pointBackgroundColor: colors.bs_indigo,
      pointBorderColor: colors.bs_indigo_light,
      pointHoverBackgroundColor: colors.bs_indigo,
      pointHoverBorderColor: colors.bs_indigo,
      pointRadius: 4,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: colors.bs_indigo,
    },
  ],
};

export const scatterChartData = {
  datasets: [
    {
      borderWidth: 2,
      showLine: false,
      label: 'Mattresses',
      borderColor: colors.bs_blue,
      backgroundColor: colors.bs_blue,
      data: [
        { x: 62, y: -78 },
        { x: -0, y: 74 },
        { x: -67, y: 45 },
        { x: -26, y: -43 },
        { x: -15, y: -30 },
        { x: 65, y: -68 },
        { x: -28, y: -61 },
      ],
    },
    {
      borderWidth: 2,
      showLine: false,
      label: 'Room',
      borderColor: colors.themeColor2,
      backgroundColor: colors.themeColor2_10,
      data: [
        { x: 79, y: 62 },
        { x: 62, y: 0 },
        { x: -76, y: -81 },
        { x: -51, y: 41 },
        { x: -9, y: 9 },
        { x: 72, y: -37 },
        { x: 62, y: -26 },
      ],
    },
  ],
};

export const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  datasets: [
    {
      label: 'Completed',
      borderColor: colors.bs_cyan,
      backgroundColor: colors.bs_cyan_light,
      hoverBackgroundColor: colors.bs_cyan,
      data: [14, 10, 8, 21, 18, 5],
      borderWidth: 2,
    },
    {
      label: 'Ongoing',
      borderColor: colors.bs_blue,
      hoverBackgroundColor: colors.bs_blue,
      backgroundColor: colors.bs_blue_light,
      data: [7, 5, 3, 11, 9, 13],
      borderWidth: 2,
    },
  ],
};

export const resourceBarChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  datasets: [
    {
      label: 'Allocated',
      borderColor: colors.bs_cyan,
      backgroundColor: colors.bs_cyan_light,
      hoverBackgroundColor: colors.bs_cyan,
      data: [120, 110, 90, 115, 95, 100],
      borderWidth: 2,
      barPercentage: 0.8,
    },
    {
      label: 'Unallocated',
      borderColor: colors.bs_blue,
      backgroundColor: colors.bs_blue_light,
      hoverBackgroundColor: colors.bs_blue,
      data: [20, 35, 45, 25, 30, 15],
      borderWidth: 2,
      barPercentage: 0.8,
    },
    {
      label: 'Total',
      borderColor: colors.bs_purple,
      backgroundColor: colors.bs_purple,
      data: [140, 145, 135, 140, 125, 115],
      borderWidth: 2,
    },
  ],
};

export const jiraTicketStatusData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
  datasets: [
    {
      label: 'Closed',
      borderColor: colors.bs_cyan,
      backgroundColor: colors.bs_cyan_light,
      hoverBackgroundColor: colors.bs_cyan,
      data: [50, 47, 32, 56, 70, 60],
      borderWidth: 2,
      stack: 'stack0',
    },
    {
      label: 'Open',
      borderColor: colors.bs_red,
      backgroundColor: colors.bs_red_light,
      hoverBackgroundColor: colors.bs_red,
      data: [36, 50, 60, 40, 34, 32],
      borderWidth: 2,
      stack: 'stack0',
    },
  ],
};
export const radarChartData = {
  datasets: [
    {
      label: 'Stock',
      borderWidth: 2,
      pointBackgroundColor: colors.bs_blue,
      borderColor: colors.bs_blue,
      backgroundColor: colors.bs_blue,
      data: [80, 90, 70],
    },
    {
      label: 'Order',
      borderWidth: 2,
      pointBackgroundColor: colors.themeColor2,
      borderColor: colors.themeColor2,
      backgroundColor: colors.themeColor2_10,
      data: [68, 80, 95],
    },
  ],
  labels: ['Mattresses', 'Bedroom', 'Living'],
};

export const pieChartReviewsData = {
  labels: ['Design', 'Development', 'Testing'],
  datasets: [
    {
      label: ['Design: 30%', 'Development: 60%', 'Testing: 10%'],
      borderColor: [colors.bs_cyan, colors.bs_blue, colors.bs_purple],
      backgroundColor: [colors.bs_cyan, colors.bs_blue, colors.bs_purple],
      borderWidth: 2,
      data: [30, 60, 10],
    },
  ],
};

export const pieChartData = {
  labels: ['Python', 'Java', 'JavaScript', 'C#', 'C++'],
  datasets: [
    {
      label: 'Languages',
      borderColor: [
        '#87CEEB',
        '#98FB98',
        '#FFD700',
        colors.bs_green,
        '#E6E6FA',
      ],
      backgroundColor: [
        '#87CEEB',
        '#98FB98',
        '#FFD700',
        colors.bs_green,
        '#E6E6FA',
      ],
      borderWidth: 2,
      data: [80, 70, 60, 50, 40],
    },
  ],
};

export const doughnutChartData = {
  labels: ['Cakes', 'Cupcakes', 'Desserts'],
  datasets: [
    {
      label: '',
      borderColor: [colors.themeColor3, colors.themeColor2, colors.bs_blue],
      backgroundColor: [
        colors.themeColor3_10,
        colors.themeColor2_10,
        colors.bs_blue,
      ],
      borderWidth: 2,
      data: [15, 25, 20],
    },
  ],
};

export const smallChartData1 = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Total Orders',
      borderColor: colors.bs_blue,
      pointBorderColor: colors.bs_blue_light,
      pointHoverBackgroundColor: colors.bs_blue,
      pointHoverBorderColor: colors.bs_blue,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data: [1250, 1300, 1550, 921, 1810, 1106, 1610],
      datalabels: {
        align: 'end',
        anchor: 'end',
      },
    },
  ],
};

export const smallChartData2 = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Pending Orders',
      borderColor: colors.bs_blue,
      pointBorderColor: colors.bs_blue_light,
      pointHoverBackgroundColor: colors.bs_blue,
      pointHoverBorderColor: colors.bs_blue,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data: [115, 120, 300, 222, 105, 85, 36],
      datalabels: {
        align: 'end',
        anchor: 'end',
      },
    },
  ],
};

export const smallChartData3 = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Total Orders',
      borderColor: colors.bs_blue,
      pointBorderColor: colors.bs_blue_light,
      pointHoverBackgroundColor: colors.bs_blue,
      pointHoverBorderColor: colors.bs_blue,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data: [350, 452, 762, 952, 630, 85, 158],
      datalabels: {
        align: 'end',
        anchor: 'end',
      },
    },
  ],
};

export const smallChartData4 = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Total Orders',
      borderColor: colors.bs_blue,
      pointBorderColor: colors.bs_blue_light,
      pointHoverBackgroundColor: colors.bs_blue,
      pointHoverBorderColor: colors.bs_blue,
      pointRadius: 2,
      pointBorderWidth: 3,
      pointHoverRadius: 2,
      fill: false,
      borderWidth: 2,
      data: [200, 452, 250, 630, 125, 85, 20],
      datalabels: {
        align: 'end',
        anchor: 'end',
      },
    },
  ],
};

export const conversionChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: '',
      data: [65, 60, 68, 60, 58, 63, 60],
      borderColor: colors.bs_purple,
      pointBackgroundColor: colors.bs_purple,
      pointBorderColor: colors.bs_purple_light,
      pointHoverBackgroundColor: colors.bs_purple,
      pointHoverBorderColor: colors.bs_purple,
      pointRadius: 4,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: colors.bs_purple,
    },
  ],
};

export const raisedTicketData = {
  labels: [
    'Hardware Issues',
    'Software Errors',
    'Network Problems',
    'User Support Requests',
  ],
  datasets: [
    {
      label: 'Resolved',
      borderColor: colors.bs_blue,
      hoverBackgroundColor: colors.bs_blue,
      backgroundColor: colors.bs_blue_light,

      data: [35, 28, 16, 20],
      borderWidth: 2,
    },
    {
      label: 'Open',
      borderColor: colors.bs_cyan,
      backgroundColor: colors.bs_cyan_light,
      hoverBackgroundColor: colors.bs_cyan,
      data: [10, 8, 4, 11],
      borderWidth: 2,
    },
  ],
};

export const resetPassTicketData = {
  labels: ['Mon', 'Tue', 'Wec', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Resolved',
      borderColor: colors.bs_green,
      data: [12, 5, 21, 14, 8],
      hoverBackgroundColor: colors.bs_green,
      backgroundColor: colors.bs_green_light,
      borderWidth: 2,
    },
    {
      label: 'Open',
      borderColor: colors.bs_blue,
      backgroundColor: colors.bs_blue_light,
      hoverBackgroundColor: colors.bs_blue,
      data: [4, 2, 8, 2, 3],
      borderWidth: 2,
    },
  ],
};

export const empOnboardData = {
  labels: [
    'Documents Rec',
    'Documents Verified',
    'Sign Bond',
    'Total new employees',
  ],
  datasets: [
    {
      label: 'Completed',
      borderColor: colors.bs_green,
      hoverBackgroundColor: colors.bs_green,
      backgroundColor: colors.bs_green_light,
      data: [7, 18, 9, 22],
      borderWidth: 2,
      stack: 'section0',
    },
    {
      label: 'Pending',
      borderColor: colors.bs_red,
      hoverBackgroundColor: colors.bs_red,
      backgroundColor: colors.bs_red_light,
      data: [-7, -8, -5, -12],
      borderWidth: 2,
      stack: 'section0',
    },
  ],
};
