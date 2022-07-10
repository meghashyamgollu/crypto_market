import { FC } from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale} from "chart.js/auto";

interface Price {
  priceArray: number[];
}

interface SparkLine {
  sparkline_in_7d: Price;
}

// ChartJS.register{
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement
// }

const LineChart: FC<Price> = ({ priceArray }) => {
  const labels = ["7d", "6d", "5d", "4d", "3d", "2d", "1d"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [...priceArray],
      },
    ],
    options: {
      scales: {
        y : {
          beginAtZero: true
        }
      }
    }
  };
  return (
    <div>
      <Line width={100} height={40} data={data} />
    </div>
  );
};

export default LineChart;
