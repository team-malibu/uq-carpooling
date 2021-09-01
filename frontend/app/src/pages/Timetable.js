import React, { useState } from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import TimeTile from '../components/TimeTile'
import './Timetable.css'

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function Timetable() {

  const [selectedDate, setSelectedDate] = useState(() => new Date())
  var dates = [];
  for (var i =0; i < 30; i++) {
    var newDate = new Date()
    newDate.setDate(selectedDate.getDate() + i)
    dates.push(<TimeTile date={newDate} isSelected={sameDay(selectedDate, newDate)}/>)
  }

  function createBody() {
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    var dateString = selectedDate.toLocaleString("en-US", options)
    console.log(dateString)

    return (
      <div>
        <div class='ttimetable'>
          <pre class='tdatetext'>{dateString.split(',').join(', ')}</pre>
        </div>
        <div class='tscrollable'>
          {dates}
        </div>
      </div>

    )
  }

  return (
    <BlankDefaultPage name={'Timetable'} currentlySelected={1} body={createBody()} />
  )
}

export default Timetable
