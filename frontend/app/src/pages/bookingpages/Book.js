import React, { useEffect, useState } from 'react'
import TripMap from '../../components/TripMap'
import TripTile from '../../components/TripTile'
import { useHistory, useLocation } from 'react-router-dom'
import { MediumConfirmButton, SquareButton } from '../../components/Button'
import './Book.css'
import BasicPage from '../../components/BasicPage'

function Book(props) {
  const location = useLocation();
  const history = useHistory();

  const [startLoc, setStartLoc] = useState(0);
  const [endLoc, setEndLoc] = useState(0);
  const [centerLoc, setCenterLoc] = useState(0);
  const [intermediateStops, setIntermediateStops] = useState(0);
  const [arriveTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [tProps, setTProps] = useState({arrive: null, setFlag: false, firstClickFlag: false});
  
  const driverId = "s1234567" //Change to ID also could be a passengerID

  if (location.state && location.state.props && location.state.props.start_date && !tProps.firstClickFlag) {
    var timeTableStart = new Date(location.state.props.start_date.valueOf() - 5 * 60000);
    setDate(timeTableStart);
    let time = timeTableStart.getHours() + ":" + timeTableStart.getMinutes() + ":" + timeTableStart.getSeconds();
    setStartTime(time);
    setTProps({arrive: timeTableStart, setFlag: true, firstClickFlag: true})
  }

  function togglePopUp() {
    setShowPopUp(false);
  }

  function showHelp() {
    setShowPopUp(true);
  }

  function updateBookTrip(flag, bookingProps) {
    if (flag.match("startMarker")) {
      setStartLoc([bookingProps.longitude, bookingProps.latitude]); 
    } else if (flag.match("endMarker")) {
      setEndLoc([bookingProps.longitude, bookingProps.latitude]);
    } else if (flag.match("date")) {
      setDate(bookingProps);
      let time = bookingProps.getHours() + ":" + bookingProps.getMinutes() + ":" + bookingProps.getSeconds();
      setStartTime(time);
    } else if (flag.match("duration")) {
      setDuration(bookingProps);
    } else if (flag.match("center")) {
      setCenterLoc(bookingProps);
    } else if (flag.match("timetable")) {
      setTProps({arrive: timeTableStart, setFlag: false, firstClickFlag: true})
    }
  }


  function createATrip(tripProps) {
    console.log(endLoc, startLoc, date, arriveTime)
    if (endLoc == 0 || startLoc == 0 || date == 0 || arriveTime == 0) {
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
        'arrive_time': arriveTime,
        'passenger_id': props.studentId
      })
    };
      fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-trip", requestOptions)
      .then(result => result.json())
      .then(data => {
        if (data.result) {
          //history.push('/Search');
        } else {
          alert(data.message);
        }
      }).catch((e) => {
      console.warn(e)
    });
  }

  function findTrips(tripProps) {
    //console.log(endLoc, startLoc, date, arriveTime)
    if (endLoc == 0 || startLoc == 0 || date == 0 || arriveTime == 0) {
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
        'arrive_time': arriveTime,
        'passenger_id': props.studentId
        
      })
    };
      fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/find-trips", requestOptions)
      .then(result => result.json())
      .then(data => {
        console.log(data)
        history.push({
          pathname: '/select',
          state: data,
        });
      }).catch((e) => {
        console.warn(e)
      });
  }

  function createBook(props) {
    return (
      <div class="booking-container">
        {/* <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/> */}
        <div class="help-container">
          <button class="helpbutton" onClick={showHelp}>?</button>
        </div>
        <div class='booktile'>
        <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland'
          updateBookTrip={updateBookTrip} tProps={tProps}/>
        </div>
        <div class="bookmap">
          <TripMap locations={[startLoc, endLoc, centerLoc, intermediateStops]} updateBookTrip={updateBookTrip} /> 
        </div>
          <div class='bookbutton' >
          <MediumConfirmButton name="Find Trips" class="findButton" 
              onClick={() => {
                findTrips();
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
    <BasicPage name={"Book"} body={createBook(props)} currentlySelected={0} 
        hide={props.hide} direction={props.direction} default={props.default} key={props.key} 
        custom={props.custom} showPopUp={showPopUp} togglePopUp={togglePopUp} popUpMessage={popUpMessage}/>

  )


}

export default Book
