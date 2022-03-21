import React, { useContext, useState, useEffect} from 'react';
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


export default function TransactionHistoryChart({isCreditChart=false}) {
  // State & Misc
  const ctx = useContext(store)
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])
  const [chartTooltip, setChartTooltip] = useState([])

  // Methods
  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp || null)
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    return [formattedDate, time]
  }

  const convertTransactionsToChartData = () => {
    if (ctx?.userInfo?.transactions.length) {
      let data = []
      let labels = []
      let tooltips = []
      ctx.userInfo.transactions.forEach(transaction => {
        const {toAddress, fromAddress, amount, timestamp} = transaction
        const isCredit = toAddress !== ctx.userAddress

        if (isCreditChart && isCredit) {
          data.push(amount)
          labels.push(timestamp)
          let [date, time] = getFormattedDate(timestamp)
          tooltips.push(`Sent $${amount} to ${toAddress} on ${date} at ${time}`)
        } else if (!isCreditChart && !isCredit) {
          data.push(amount)
          labels.push(timestamp)
          let [date, time] = getFormattedDate(timestamp)
          tooltips.push(`Received $${amount} from ${fromAddress || 'Anonymous'} on ${date} at ${time}`)
        }
      })
      setChartData(data)
      setChartLabels(labels)
      setChartTooltip(tooltips)
    }
  }

  // Chart Config

  const footer = ([item]) => {
    console.log(item)
    const idx = item.dataIndex
    return item.dataset.transactionBlurbs[idx];
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer: footer
        }
      },
    },
  }; 

  let data = {
      labels: chartLabels,
      datasets: [
        {
          label: isCreditChart ? "Credits" : "Debits",
          data: chartData,
          transactionBlurbs: chartTooltip,
          borderColor: isCreditChart ? 'rgb(235, 53, 83)': 'rgb(53, 162, 235)',
        },
      ],
    };

  // Lifecycles 
  useEffect(() => {
    if(Object.keys(ctx.userInfo).length) {
      convertTransactionsToChartData()
    }
  }, [ctx.userInfo]);
    
  return (
      <Line options={options} data={data} />
    )
}
