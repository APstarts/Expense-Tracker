import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ chartingdata }) {
  const labels = ['Food', 'Fuel', 'Entertainment', 'Travel'];
  const totals = {};

  // Initialize totals
  for (let label of labels) {
    totals[label.toLowerCase()] = 0; // what it does is that it adds properties named each of the labels which are inside the labels array and provides them a value of zero. This makes it easier to manage as if we change anything in array everything else will be automated.
  }

  // Ensure chartingdata is an array before looping
  if (Array.isArray(chartingdata)) {
    for (let item of chartingdata) {
      const name = item.expensename.toLowerCase();
      for (let label of labels) {
        if (name.includes(label.toLowerCase())) {
          totals[label.toLowerCase()] += item.amount;
          break;
        }
      }
    }
  }

  const dataForChart = labels.map(label => totals[label.toLowerCase()] || 0);
  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']; // auto grow if needed

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Expense',
        data: dataForChart,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="chart-container h-100 w-80 md:h-[500px] md:w-[500px]">
      <Bar data={chartData} />
    </div>
  );
}


export default Chart;