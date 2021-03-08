import React, {useState, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2'
import numeral from "numeral";


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
}

function Graph() {
  const [data, setData] = useState({})
//https://disease.sh/v3/covid-19/historical/all?lastdays=120

const buildChartData = (data, casesType='cases') =>{
  const chartData = []
  let lastDataPoint ;

  for(let date in data.cases){
    if(lastDataPoint){
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      }
      chartData.push(newDataPoint)
    }
    lastDataPoint = data[casesType ][date]
  }
  return chartData
} 

useEffect(() => {
  const fetchData = async() =>{
     await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        const chartData = buildChartData(data)
        setData(chartData)
      })
  }
  fetchData()
  },[])

return (
    <div className="lineChart">
      <h1>World Wide New Cases</h1>
      {data?.length > 0 && (
        <>
      
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "#001493",
                borderColor: "#01579B",
                data: data,
              },
            ],
          }}
          options={options}
        />
          <Bar
          data={{
            datasets: [
              {
                backgroundColor: "#001493",
                borderColor: "#01579B",
                data: data,
              },
            ],
          }}
          options={options}
        />
        </>
        
      )}
    </div>
  )
}

export default Graph
