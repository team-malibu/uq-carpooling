import React from 'react'
import './TimeTile.css'

function TimeTile(props) {
  var options_day_char = { weekday: 'narrow'};
  var options_day_num = { day: 'numeric'}

  const date = props.date
  const day_char = date.toLocaleString('en-US', options_day_char)
  const day_num = date.toLocaleString('en-US', options_day_num)

  const isSelected = props.isSelected
  

  console.log(date.toLocaleString())
  return isSelected ? (
    <div class = 'ttwrapper'>

        <p>{day_char}</p>
        <div class = 'ttcircle_selected'>
          {day_num}
        </div>
    </div>
  ) : (
    <div class = 'ttwrapper'>

    <p>{day_char}</p>
    <div class = 'ttcircle'>
      {day_num}
    </div>
</div>
  )
}

export default TimeTile
