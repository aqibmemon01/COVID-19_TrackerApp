import React, {useState, useEffect} from 'react'
import {Line, Pie,Doughnut} from 'react-chartjs-2'
import { Card, CardContent, Typography } from "@material-ui/core";



function Graph() {
  const [data, setData] = useState([])
//https://disease.sh/v3/covid-19/historical/all?lastdays=120


useEffect(() => {
  const fetchData = async() =>{
     await fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        var NewData = []
     
        NewData.push(data.todayCases)
        NewData.push(data.todayRecovered)
        NewData.push(data.todayDeaths)


        setData(NewData)
      })
  }
  fetchData()
  },[])

return (
    <div className="lineChart">
      <h1>Today Report</h1>
       <>
 
        <Doughnut
          data={{
            labels: ['Case', 'Recovered', 'Death'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: [
                  '#2FDE00',
                  '#00A6B4',
                  '#B21F00',
                ],
                hoverBackgroundColor: [
                '#175000',
                '#501800',
                '#003350'

                ],
                data: data
              }
            ]
          }}
          options={{
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        <Pie
          data={{
            labels: ['Case', 'Recovered', 'Death'],
            datasets: [
              {
                label: 'Rainfall',
                backgroundColor: [
                  '#2FDE00',
                  '#00A6B4',
                  '#B21F00',
                ],
                hoverBackgroundColor: [
                '#175000',
                '#501800',
                '#003350'

                ],
                data: data
              }
            ]
          }}
          options={{
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </>
        
   
    </div>
  )
}

export default Graph
