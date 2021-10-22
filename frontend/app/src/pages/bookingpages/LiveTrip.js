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
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [tProps, setTProps] = useState({ arrive: null, setFlag: false, firstClickFlag: false });

  console.log(navigator);
  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log("position")
      console.log(position);
    },
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  );

  if (location.state && location.state.props && location.state.props.start_date && !tProps.firstClickFlag) {
    var timeTableStart = new Date(location.state.props.start_date.valueOf() - 5 * 60000);
    setDate(timeTableStart);
    let time = timeTableStart.getHours() + ":" + timeTableStart.getMinutes() + ":" + timeTableStart.getSeconds();
    setStartTime(time);
    setTProps({ arrive: timeTableStart, setFlag: true, firstClickFlag: true });
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
      setTProps({ arrive: timeTableStart, setFlag: false, firstClickFlag: true })
    }
  }


  function viewLiveTrip(tripProps) {
    //console.log(endLoc, startLoc, date, arriveTime)
    
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     'trip_id': start_long,
    //     'start_lat': start_lat,
    //     'end_long': end_long,
    //     'end_lat': end_lat,
    //     'center_long': center_long,
    //     'center_lat': center_lat,
    //     'intermediateStops': intermediateStops,
    //     'duration': duration,
    //     'date': date,
    //     'arrive_time': arriveTime,
    //     'passenger_id': props.studentId

    //   })
    // };
    // fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/view-live-trip", requestOptions)
    //   .then(result => result.json())
    //   .then(data => {
    //     console.log(data);
    //     }).catch((e) => {
    //     console.warn(e)
    //   });
  }

  function createLiveTrip(props) {
    return (
      <div class="booking-container">
        {/* <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/> */}
        <div class="help-container">
          <button class="helpbutton" onClick={showHelp}>?</button>
        </div>
        <div class="bookmap">
          <TripMap locations={[startLoc, endLoc, centerLoc, intermediateStops]} updateBookTrip={updateBookTrip} />
        </div>
      </div>
    )
  }

  return (

    // <BlankDefaultPage name={"Book"} body={createLiveTrip()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"Book"} body={createLiveTrip(props)} currentlySelected={0}
      hide={props.hide} direction={props.direction} default={props.default} key={props.key}
      custom={props.custom} showPopUp={showPopUp} togglePopUp={togglePopUp} popUpMessage={popUpMessage} />

  )


}

export default Book
