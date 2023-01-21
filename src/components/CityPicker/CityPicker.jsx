import React from 'react'
import PropTypes from 'prop-types'
import './CityPicker.css'
function CityPicker ({ prefectures, onCheckBox }) {
  const onCheckBoxCity = (e) => {
    // console.log(e.target.checked);
    onCheckBox({ name: e.target.name, status: e.target.checked })
    // onCheckBox(e.target.checked);
  }
  return (
    <div className="container">
      {prefectures
        ? prefectures.map((prefecture) => {
          return (
              <label className="city-name" key={prefecture.prefCode}>
                <input
                  type="checkbox"
                  id={prefecture.prefCode}
                  onChange={onCheckBoxCity}
                  name={prefecture.prefName}
                  // element={prefecture}
                />
                <span>{prefecture.prefName}</span>
              </label>
          )
        })
        : null}
    </div>
  )
}
CityPicker.protoTypes = {
  prefectures: PropTypes.array.isRequired,
  onCheckBox: PropTypes.func.isRequired
}

export default CityPicker
