import React, { useState, useEffect } from 'react'
import CityPicker from './components/CityPicker/CityPicker'
import './App.css'
import axios from 'axios'
import Chart from './components/Chart/Chart'
import Footer from './layouts/footer/footer'

App.propTypes = {}

function App (props) {
  const [prefectures, setPrefectures] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      headers: { 'X-API-KEY': 'X8oPp2Dc2IA8GOzI0yyirpVnHlIREMAPCwc5l0HP' }
    }).then((res) => {
      const prefectures = [...res.data.result]
      prefectures.forEach((prefecture) => {
        axios({
          method: 'get',
          url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefecture.prefCode}`,
          headers: {
            'X-API-KEY': 'X8oPp2Dc2IA8GOzI0yyirpVnHlIREMAPCwc5l0HP'
          }
        }).then((res) => {
          const populationTotal = [
            ...res.data.result.data.filter((p) => p.label === '総人口')
          ]
          prefecture.data = populationTotal
          prefecture.status = false
        })
      })
      setPrefectures(prefectures)
    })
  }, [])

  useEffect(() => {
    setPrefectures(prefectures)
  }, [prefectures])

  function onCheckBox (element) {
    const prefecturesCopy = [...prefectures]
    console.log(element.name, element.status)
    prefecturesCopy.forEach((prefecture) => {
      if (prefecture.prefName === element.name) {
        element.status
          ? (prefecture.status = true)
          : (prefecture.status = false)
      }
    })
    setPrefectures(prefecturesCopy)
  }
  return (
    <div className="app">
      <img
        src="https://avatars.githubusercontent.com/u/92067528?v=4"
        className="logo"
      />
      <CityPicker prefectures={prefectures} onCheckBox={onCheckBox} />
      <Chart prefectures={prefectures} />
      <Footer />
    </div>
  )
}

export default App
