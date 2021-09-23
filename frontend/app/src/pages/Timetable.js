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
  for (var i = 0; i < 30; i++) {
    var newDate = new Date()
    newDate.setDate(selectedDate.getDate() + i)
    dates.push(<TimeTile date={newDate} isSelected={sameDay(selectedDate, newDate)} />)
  }

  const handleFile = (e) => {
    const content = e.target.result;
    const events = ical.parseICS(content);
      console.log(events)
      for (const event of Object.values(events)) {
        console.log(
          'Summary: ' + event.summary.val +
          '\nDescription: ' + event.description +
          '\nBuiling Location: UQ ' + event.location +
          '\nStart Date: ' + event.start.toDateString() + ' ' + event.start.toLocaleTimeString() +
          '\nEnd Date: ' + event.end.toDateString() + ' ' + event.end.toLocaleTimeString() +
          '\n'
        );
      }

    // You can set content in state and show it in render.
  }
  
  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmission = async () => {
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const data = (e.target.result);
      console.log('1')
      const events = ical.parseICS(data);
      console.log('2')
      for (const event of Object.values(events)) {
        console.log(
          'Summary: ' + event.summary +
          '\nDescription: ' + event.description +
          '\nStart Date: ' + event.start.toISOString() +
          '\n'
        );
      }
      console.log('3')
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
          <input type="file" accept=".ics" onChange={e =>
            handleChangeFile(e.target.files[0])} />
        </div>
      </div>

    )
  }

  return (
    <BlankDefaultPage name={'Timetable'} currentlySelected={1} hide={true} body={createBody()} />
  )
}

export default Timetable
