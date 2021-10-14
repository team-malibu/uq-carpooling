import React, { useState } from 'react'
import BasicPage from '../../components/BasicPage'
import TimetableTile from '../../components/TimetableTile';
import TimeTile from '../../components/TimeTile'
import './Timetable.css'

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

var classes = new Map();

const getOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    'student_id': '12345678',
  })
};

fetch("https://deco3801-teammalibu.uqcloud.net/db/timetables/user/get-events", getOptions)
.then(result => result.json())
.then(data => {
  for (const event of Object.values(data)) {
    var start = new Date(event.start)
    var end = new Date(event.end)
    console.warn(start.toISOString().split('T')[0])
    classes.set(start.toISOString().split('T')[0], {
      'name': event.name,
      'desc': event.description,
      'location': event.location,
      'start': start.toDateString().split(' ')[0] + ', ' + start.toDateString().split(' ')[1] + ' ' + start.toDateString().split(' ')[2]  + ', '  + start.toLocaleTimeString().split(':')[0] + ':' + start.toLocaleTimeString().split(':')[1] + ' ' + start.toLocaleTimeString().split(' ')[1],
      'end': end.toDateString().split(' ')[0] + ', ' + end.toDateString().split(' ')[1] + ' ' + end.toDateString().split(' ')[2]  + ', '  + end.toLocaleTimeString().split(':')[0] + ':' + end.toLocaleTimeString().split(':')[1] + ' ' + end.toLocaleTimeString().split(' ')[1],
    })
  }
  console.log(classes)
});


function Timetable(props) {
  const ical = require('node-ical');
  const fs = require('fs');
  const [selectedFile, setSelectedFile] = useState();
  const [isFIlePicked, setIsFilePicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const todaysDate = new Date()

  var dates = [];
  for (var i = 0; i < 30; i++) {
    var newDate = new Date()
    newDate.setDate(todaysDate.getDate() + i)
    dates.push(<TimeTile date={newDate} updateSelected={(date) => setSelectedDate(date)} isSelected={sameDay(selectedDate, newDate)}/>)
  }

  
  const handleFile = (e) => {
    
    // const content = e.target.result;
    // const events = ical.parseICS(content);
    // console.log(events)
    // for (const event of Object.values(events)) {
    //   classes.set(start.toISOString().split('T')[0], {
    //     'name': event.summary.val,
    //     'desc': event.description,
    //     'location': event.location,
    //     'start': start.toDateString().split(' ')[0] + ', ' + start.toDateString().split(' ')[1] + ' ' + start.toDateString().split(' ')[2]  + ', '  + start.toLocaleTimeString().split(':')[0] + ':' + start.toLocaleTimeString().split(':')[1] + ' ' + start.toLocaleTimeString().split(' ')[1],
    //     'end': end.toDateString().split(' ')[0] + ', ' + end.toDateString().split(' ')[1] + ' ' + end.toDateString().split(' ')[2]  + ', '  + end.toLocaleTimeString().split(':')[0] + ':' + end.toLocaleTimeString().split(':')[1] + ' ' + end.toLocaleTimeString().split(' ')[1],
    //   })

    // }

    // for (let unit of classes.values()) {
    //   console.log(unit)
    // }

    // You can set content in state and show it in render.
  }

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  }

  function createBody() {
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    var dateString = selectedDate.toLocaleString("en-US", options);

    var unit = []
    for (let [key, value] of classes.entries()) {
      console.log('Key: ' + key + 'Selected Date: ' + selectedDate.toISOString().split('T')[0])
      if (key == selectedDate.toISOString().split('T')[0]) {
        console.log('inside')
        unit.push(
          <TimetableTile event = {value}/>
        )
      }
     
    }
    console.log(unit)


    return (
      <div>
        <div class='ttimetable'>
          <pre class='tdatetext'>{dateString.split(',').join(', ')}</pre>
        </div>
        <div class='tscrollable'>
          {dates}
        </div>
        {/* <div>
          <input type="file" accept=".ics" onChange={e =>
            handleChangeFile(e.target.files[0])} />
        </div> */}
        <div class='timeitems'>

          {unit}
        </div>


      </div>


    )
  }

  return (
    <BasicPage name={'Timetable'} currentlySelected={1} body={createBody() } hide={props.hide} default={props.default} direction={props.direction} key={props.key} custom={props.custom} />

  )
}

export default Timetable
