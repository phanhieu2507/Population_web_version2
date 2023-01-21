import React, { useEffect, useState } from 'react'
import './Chart.css'
import Highcharts from 'highcharts'

Chart.propTypes = {}

function Chart ({ prefectures }) {
  function creatEmptyData () {
    const array = { data: [] }
    for (let i = 0; i < 17; i++) {
      array.data.splice(0, 0, null)
    }
    console.log(array)
    return array
  }
  const [series, setSeries] = useState(
    JSON.parse(localStorage.getItem('series'))
  )
  useEffect(() => {
    if (prefectures.length > 0) {
      let series = prefectures.map((prefecture) => {
        if (prefecture.status) {
          return {
            name: prefecture.prefName,
            data: prefecture.data[0].data.map((d) => d.value)
          }
        } else {
          return null
        }
      })
      series = series.filter((serie) => serie != null)
      setSeries(series)
      localStorage.setItem('series', JSON.stringify(series))
    }
  }, [prefectures])
  useEffect(() => {
    setSeries(series)
    highChartRender(series)
  }, [series])

  function highChartRender (series) {
    Highcharts.chart('container', {
      chart: {
        height: (9 / 16) * 100 + '%', // 16:9 ratio
        styledMode: true
      },

      title: {
        text: '日本の行政単位による人口の変化'
      },

      yAxis: {
        title: {
          text: '人口'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        },
        type: 'datetime'
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: Date.UTC(1960),
          pointInterval: 31556952000 * 5 // 5 year to milliseconds
        }
      },

      series: series || [creatEmptyData],

      responsive: {
        rules: [
          {
            condition: {
              minHeight: 2000,
              minWidth: 2000
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    })
  }

  return (
    <div>
      <figure className="highcharts-figure">
        <div id="container"></div>
      </figure>
    </div>
  )
}

export default Chart
