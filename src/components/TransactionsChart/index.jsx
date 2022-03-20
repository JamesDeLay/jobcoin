import React, { useContext, useEffect, useState } from 'react';
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
import store from '../../context/store';
// import randomColor from 'randomcolor';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const labels = ;


export default function TransactionsChart() {
  const ctx = useContext(store)
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])

  const convertTransactionsToChartData = () => {
    // console.log(transactions);
    // const addresses = new Set()
    // FIXME: what happens when two transactions overlap?
    let datetimes = []

    let balanceTimeseries = []
    
    // Sort transactions by datetime going back in time
    const sortedTransactions = ctx?.userInfo?.transactions?.reverse()
    let balance = Number(ctx.userInfo.balance)
    
    balanceTimeseries.push(balance)
    const date = new Date()
      const tsLabel = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      datetimes.push(tsLabel)
    datetimes.push()
    
    sortedTransactions.forEach(({fromAddress, amount, timestamp}) => {
      // console.log(fromAddress)
      // addresses.add(toAddress)
      // addresses.add(fromAddress || 'N/A')
      if (fromAddress) {
        balance += Number(amount)
      } else {
        balance -= Number(amount)
      }
      balanceTimeseries.push(balance)
      const date = new Date(timestamp)
      const tsLabel = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      datetimes.push(tsLabel)
    })
    console.log(balance)
    

    setChartData(balanceTimeseries.reverse())
    setChartLabels(datetimes.reverse())
    
  }

    useEffect(() => {
        
        console.log('Label/Data Change')
        if(ctx?.userInfo?.transactions?.length) {
          convertTransactionsToChartData()
        }
    }, [ctx.userInfo]);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: false,
          },
        },
      };
    let label = ctx.userAddress
    let labels = chartLabels
    // let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    let data = {
        labels,
        datasets: [
          {
            label,
            data: chartData,
            // data: labels.map(() => Math.random() * 100),
            borderColor: 'rgb(53, 162, 235)',
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return (
      <Line options={options} data={data} />
    )
}
