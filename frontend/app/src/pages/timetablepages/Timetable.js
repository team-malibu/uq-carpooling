import React, { useState } from 'react'
import BasicPage from '../../components/BasicPage'
import TimetableTile from '../../components/TimetableTile';
import TimeTile from '../../components/TimeTile';
import { Redirect } from 'react-router-dom';
import './Timetable.css'

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

var classes = new Map();

/**
  * Displays the calendar and timetabled classes of the user when a specific day with a class 
  * is selected by the user
  */
function Timetable(props) {

  var student_id = props.studentId;
  const [homeDetails, setHomeDetails] = useState({detailsFoundFlag: false, homeDetails: {}});

  const getOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'student_id': student_id,
    })
  };

  fetch("https://deco3801-teammalibu.uqcloud.net/db/timetables/user/get-events", getOptions)
  .then(result => result.json())
  .then(data => {
    for (const event of Object.values(data)) {
      var start = new Date(event.start.replace('Z',''))
      var end = new Date(event.end.replace('Z',''))
  
  
      var new_start = event.start.split('T')
      var new_end = event.end.split('T')
      
      classes.set(new_start[0], {
        'name': event.name,
        'desc': event.description,
        'location': event.location,
        'start': start.toDateString().split(' ')[0] + ', ' + start.toDateString().split(' ')[1] + ' ' + start.toDateString().split(' ')[2]  + ', ' + new_start[1].split('.')[0],
        'start_date': start,
        'end': end.toDateString().split(' ')[0] + ', ' + end.toDateString().split(' ')[1] + ' ' + end.toDateString().split(' ')[2]  + ', '  + new_end[1].split('.')[0],
      })
    }
  });
  
 if (!homeDetails.detailsFoundFlag) {
  fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/get", getOptions)
  .then(result => result.json())
  .then(data => {
      setHomeDetails({detailsFoundFlag: true, homeDetails: {location: data[0].home_address, coords: [Number(data[0].home_long), Number(data[0].home_lat)]}});
    }
  );
 }
  

  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const todaysDate = new Date()

  var dates = [];
  for (var i = 0; i < 30; i++) {
    var newDate = new Date()
    newDate.setDate(todaysDate.getDate() + i)
    dates.push(<TimeTile key={newDate} date={newDate} updateSelected={(date) => setSelectedDate(date)} isSelected={sameDay(selectedDate, newDate)}/>)
  }

  /**
  * Allows a user to select a date so that timetabled classes for that day may be displayed
  */
  function createBody() {
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    var dateString = selectedDate.toLocaleString("en-US", options);

    var unit = []
    for (let [key, value] of classes.entries()) {
      if (key === selectedDate.toISOString().split('T')[0]) {

        unit.push(
          <TimetableTile event = {value} update_direction={props.update_direction} homeDetails={homeDetails}/>
        )
      }
     
    }


    if (props.studentId == null) {
      props.update_direction(0);
      return (<Redirect to="/" />);
    }
    return (
      <div class='bigtimetablewrapper'>
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
