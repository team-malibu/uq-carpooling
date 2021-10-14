import React, { useEffect, useState } from 'react'
import TripMap from '../../components/TripMap'
import TripTile from '../../components/TripTile'
import { useHistory, useLocation } from 'react-router-dom'
import { MediumConfirmButton, SquareButton } from '../../components/Button'
import './Book.css'
import BasicPage from '../../components/BasicPage'

function Book(props) {
  const location = useLocation();
  var start = '';
  console.warn(props)
  if (location.state.props) {
    console.warn(location.state)
    console.log('Start time ' + location.state.props.start_date)
    start = location.state.props.start_date

  } else {
    console.log('undefined')
  }

  console.error('FCUK')
  console.log(location.state)
  
  const history = useHistory();
  const [startLoc, setStartLoc] = useState(0);
  const [endLoc, setEndLoc] = useState(0);
  const [centerLoc, setCenterLoc] = useState(0);
  const [intermediateStops, setIntermediateStops] = useState(0);
  const [startTime, setStartTime] = useState(start);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const driverId = "s1234567"




  
  

  function updateBookTrip(flag, bookingProps) {
    if (flag.match("startMarker")) {
      setStartLoc([bookingProps.longitude, bookingProps.latitude]); 
    } else if (flag.match("endMarker")) {
      setEndLoc([bookingProps.longitude, bookingProps.latitude]);
    } else if (flag.match("date")) {
      setDate(bookingProps);
      let time = bookingProps.getHours() + ":" + bookingProps.getMinutes() + ":" + bookingProps.getSeconds();
      console.log(time);
      setStartTime(time);
    } else if (flag.match("duration")) {
      console.log("new duration is " + String(bookingProps))
      setDuration(bookingProps);
    }
  }


  function createATrip(tripProps) {
    console.log(endLoc, startLoc, date, startTime)
    if (endLoc == 0 || startLoc == 0 || date == 0 || startTime == 0) {
      alert("Fill all trip fields!")
      return
    }

    let coordinateCutoff = 12

    let start_long = String(startLoc[0]).slice(0, coordinateCutoff)
    let start_lat = String(startLoc[1]).slice(0, coordinateCutoff)
    let end_long = String(endLoc[0]).slice(0, coordinateCutoff)
    let end_lat = String(endLoc[1]).slice(0, coordinateCutoff)
    let center_long = String(centerLoc[0]).slice(0, coordinateCutoff)
    let center_lat = String(centerLoc[1]).slice(0, coordinateCutoff)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'start_long': start_long,
        'start_lat': start_lat,
        'end_long': end_long,
        'end_lat': end_lat,
        'center_long': center_long,
        'center_lat': center_lat,
        'intermediateStops': intermediateStops,
        'duration': duration,
        'date': date,
        'start_time': startTime,
        'driver_id': driverId
      })
    };
    try {
      fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-trip", requestOptions)
      .then(result => result.json())
      .then(data => {
        if (data.result) {
          history.push('/Account');
        } else {
          alert(data.message);
        }
      });
    } catch (e) {
      console.warn(e)
    }
  }

  function createBook(props) {
    return (
      <div class="booking-container">
        {/* <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/> */}
        <div class='booktile'>
        <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland'
          updateBookTrip={updateBookTrip} start_date={start}/>
        </div>
        <div class="bookmap">
          <TripMap locations={[startLoc, endLoc, centerLoc, intermediateStops]} updateBookTrip={updateBookTrip} /> 
        </div>
          <div class='bookbutton' >
          <MediumConfirmButton name="Find Trips" class="findButton" 
              onClick={() => {
                
                //findTrips();
              }}/>
          <MediumConfirmButton name="Create Trip" class="createButton"
              onClick={() => {
                createATrip();
              }}/>
        </div>
      </div>
    )
  }

  return (

    // <BlankDefaultPage name={"Book"} body={createBook()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"Book"} studentId = {location.state.id} body={createBook(props)} currentlySelected={0} hide={props.hide} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )


}

export default Book
