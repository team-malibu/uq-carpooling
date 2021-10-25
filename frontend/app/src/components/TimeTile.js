import React from 'react'
import './TimeTile.css'

/**
 * The TimeTile component makes up the scrollable view of Dates
 * on the TimeTable page. Upon clicking one it will render the 
 * TimetableTiles of the selected date.
 * 
 */
function TimeTile(props) {
  var options_day_char = { weekday: 'narrow' };
  var options_day_num = { day: 'numeric' }

  const date = props.date
  const day_char = date.toLocaleString('en-US', options_day_char)
  const day_num = date.toLocaleString('en-US', options_day_num)

  const isSelected = props.isSelected

  return isSelected ? (
    <div class='ttwrapper' onClick={() => {
      props.updateSelected(date)
    }}>

      <p>{day_char}</p>
      <div class='ttcircle_selected'>
        {day_num}
      </div>
    </div>
  ) : (
    <div class='ttwrapper' onClick={() => {
      props.updateSelected(date)
    }}>

      <p>{day_char}</p>
      <div class='ttcircle'>
        {day_num}
      </div>
    </div>
  )
}

export default TimeTile
