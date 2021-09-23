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
  const ical = require('node-ical');
  const fs = require('fs');
  const [selectedFile, setSelectedFile] = useState();
  const [isFIlePicked, setIsFilePicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  var dates = [];
  for (var i =0; i < 30; i++) {
    var newDate = new Date()
    newDate.setDate(selectedDate.getDate() + i)
    dates.push(<TimeTile date={newDate} isSelected={sameDay(selectedDate, newDate)}/>)
  }
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = () => {
    const fileReader = new FileReader();
    fileReader.onload = async(e) => {
      const data = (e.target.result);
      const events = ical.parseICS(data);
      for (const event of Object.values(events)) {
        console.log(
          'Summary: ' + event.summary +
          '\nDescription: ' + event.description +
          '\nStart Date: ' + event.start.toISOString() +
          '\n'
        );
      }
    }
  };

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
        <div>
          <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </div>

    )
  }

  return (
    <BlankDefaultPage name={'Timetable'} currentlySelected={1} hide={true}  body={createBody()} />
  )
}

export default Timetable
