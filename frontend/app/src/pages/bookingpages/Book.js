import React, { useState } from 'react'
import TripMap from '../../components/TripMap'
import TripTile from '../../components/TripTile'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { MediumConfirmButton } from '../../components/Button'
import './Book.css'
import BasicPage from '../../components/BasicPage'

function Book(props) {
  const location = useLocation();
  const history = useHistory();

  const [startLoc, setStartLoc] = useState(0);
  const [startLocationName, setStartLocationName] = useState("")
  const [endLocationName, setEndLocationName] = useState("");
  const [endLoc, setEndLoc] = useState(0);
  const [centerLoc, setCenterLoc] = useState(0);
  // Set Intermediate stops not used @Arthur
  const [route, setRoute] = useState(0);
  const [arriveTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  // Set Popup Message not used @Arthur
  const [popUpMessage, setPopUpMessage] = useState("");
  
  const UQLong = 153.013224;
  const UQLat = -27.497473;
  const [filter, setFilter] = useState(false);

  const [tProps, setTProps] = useState({ arrive: null, setFlag: false, firstClickFlag: false, home_coords: [0, 0], home_location: "", endLocationName: "University of Queensland", end_coords: [UQLong, UQLat]});


  if (location.state && location.state.props && location.state.props.start_date && !tProps.firstClickFlag) {
    var timeTableStart = new Date(location.state.props.start_date.valueOf() - 5 * 60000);

    setDate(timeTableStart);
    let time = timeTableStart.getHours() + ":" + timeTableStart.getMinutes() + ":" + timeTableStart.getSeconds();
    setStartTime(time);
    setTProps({ arrive: timeTableStart, 
      setFlag: true, 
      home_coords: location.state.homeDetails.homeDetails.coords, 
      home_location: location.state.homeDetails.homeDetails.location, 
      endLocationName: "University of Queensland",
      end_coords: [UQLong, UQLat],
      firstClickFlag: true });
  }
  if ((endLoc == 0 || startLoc == 0) && tProps.setFlag) { 
    setEndLoc(tProps.end_coords);
    setStartLoc(tProps.home_coords);
  }

  if ((startLocationName == "" || endLocationName == "") && tProps.setFlag) { 
    setStartLocationName(tProps.home_location);
    setEndLocationName(tProps.endLocationName);
  }

  function togglePopUp() {
    setShowPopUp(false);
  }

  function showHelp() {
    setShowPopUp(true);
  }

  function updateBookTrip(flag, bookingProps) {
    if (flag.match("startMarker")) {
      setStartLoc([bookingProps.markerProps.longitude, bookingProps.markerProps.latitude]);
      setStartLocationName(bookingProps.value.text);
    } else if (flag.match("endMarker")) {
      setEndLoc([bookingProps.markerProps.longitude, bookingProps.markerProps.latitude]);
      setEndLocationName(bookingProps.value.text);
    } else if (flag.match("date")) {
      let date = bookingProps.getFullYear() + "-" + (bookingProps.getMonth() + 1) + "-" + (bookingProps.getDate());
      let time = bookingProps.getHours() + ":" + bookingProps.getMinutes() + ":" + bookingProps.getSeconds();
      date = date + " " + time;
      setDate(date)
      setStartTime(time);
    } else if (flag.match("duration")) {
      if (String(duration) != String(bookingProps)) {
        setDuration(bookingProps);
      }
    } else if (flag.match("center")) {
      setCenterLoc(bookingProps);
    } else if (flag.match("timetable")) {
      setTProps({ arrive: timeTableStart, setFlag: false, firstClickFlag: true })
    } else if (flag.match("route")) {
      if (String(route) != String(bookingProps)) {
        setRoute(String(bookingProps))
      }
    } else if (flag.match("filter")) {
      setFilter(bookingProps);
    }
  }


  async function createATrip(tripProps) {
    console.log(endLoc, startLoc, date, arriveTime, route);
    if (endLoc === 0 || startLoc === 0 || date === 0 || arriveTime === 0) {
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
    console.log(startLocationName)
    console.log(endLocationName)
    console.log(date)

    if (date instanceof Date) {
      var new_date = new Date(date.valueOf() + 10 * 60 * 60000);
    } else {
      new_date = date
    }
    

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
        'duration': duration,
        'date': new_date,
        'arrive_time': arriveTime,
        'driver_id': props.studentId,
        'route': String(route),
        'start_location': startLocationName,
        'end_location': endLocationName
      })
    };

    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-trip", requestOptions)
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

      history.push('/Trips')
  }
  
  
  function findTrips(tripProps) {
    console.log(endLoc, startLoc, date, arriveTime);
    if (endLoc === 0 || startLoc === 0 || date === 0 || arriveTime === 0) {
      alert("Fill all trip fields!")
      return;
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
        'duration': duration,
        'date': date,
        'arrive_time': arriveTime,
        'passenger_id': props.studentId

      })
    };
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/" + (filter ? "find-trips-with-preferences" : "find-trips"), requestOptions)
      .then(result => result.json())
      .then(data => {
        if (data.length > 0) {
          history.push({
            pathname: '/select',
            state: { 
              data: data, 
              passenger_long: start_long, 
              passenger_lat: start_lat,
              passenger_location: startLocationName
            },
          });
        } else {
          setPopUpMessage("No trips found");
          setShowPopUp(true);
        }
      }).catch((e) => {
        console.warn(e)
      });
  }

  function createBook(props) {
    if (props.studentId == null) {
      props.update_direction(0);
      return (<Redirect to="/" />);
    }
    return (
      <div class="booking-container">
        <div class="help-container">
          <button class="helpbutton" onClick={showHelp}>?</button>
        </div>
        <div class='booktile'>
          <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland'
            updateBookTrip={updateBookTrip} tProps={tProps} startName={tProps.home_location} endName={tProps.endLocationName}/>
        </div>
        <div class="bookmap">
          <TripMap locations={[startLoc, endLoc, centerLoc]} updateBookTrip={updateBookTrip} tProps={tProps} />
        </div>
        <div class='bookbutton' >
          <MediumConfirmButton name="Find Trips" class="findButton"
            onClick={() => {
              findTrips();
            }} />
          <MediumConfirmButton name="Create Trip" class="createButton"
            onClick={() => {
              createATrip();
            }} />
        </div>
      </div>
    )
  }

  return (

    // <BlankDefaultPage name={"Book"} body={createBook()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"Book"} body={createBook(props)} currentlySelected={0}
      hide={props.hide} direction={props.direction} default={props.default} key={props.key}
      custom={props.custom} showPopUp={showPopUp} togglePopUp={togglePopUp} popUpMessage={popUpMessage} />

  )


}

export default Book
