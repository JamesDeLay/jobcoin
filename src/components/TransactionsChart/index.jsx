import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// const labels = ;


export default function TransactionsChart({labels=[], data={}}) {
    useEffect(() => {
        
        console.log('Label/Data Change')
        console.log({labels,data})
    }, [labels, data]);
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
    labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => Math.random() * 100),
            borderColor: `${randomColor("dark")}`,
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(53, 162, 235)',
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return (
      <Line options={options} data={data} />
    )
}
