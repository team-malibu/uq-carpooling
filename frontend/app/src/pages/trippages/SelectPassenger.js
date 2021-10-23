import { React, useState, useEffect } from 'react'
import BasicPage from '../../components/BasicPage'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import { useParams, useLocation } from 'react-router-dom'
import './SelectPassenger.css'

//Does this need to go to a different file????
function PassengerTile(props) {


  const userOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'student_id': props.passengerId,
    })
  }

  if (!props.userData.data.size != props.total && !props.userData.data.has(props.passengerId)) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/get", userOptions)
      .then(result => result.json())
      .then(data => {

        console.log(userOptions)
        console.log(data)
        var current = props.userData.data
        current.set(props.passengerId, data)
        props.setUserData({
          data: current,

        })


      }).catch((e) => {
        console.warn(e)
      });
  }

  async function handleRejectPassengerRequest(props) {
    //Fetch Calls to update db here
    const rejectionOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'passenger_id': props.passengerId,//THIS IS WRONG AND NEEDS TO BE THE PASSENGER OF THE TILE
        'trip_id': props.tripId,

      })
    };

    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/deny-trip-request", rejectionOptions)
      .then(result => result.json())
      .then(data => {
        // var current = props.userData.data
        // current.delete(props.passengerId)
        props.setUserData({
          data: new Map()
        })

        props.update({
          requestData: [],
          requestFoundFlag: false,
          confirmedData: [],
          confirmedFoundFlag: false
        });
      }).catch((e) => {
        console.warn(e)
      });
  }

  async function handleAcceptPassengerRequest(props) {
    var passenger_count;
    var intermediate_passengers;
    var intermediate_coordinates;
    var full_flag = 0;
    var routeString;
    var firstCoord;
    var lastCoord;
    var tripDuration;
    const getTripOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'trip_id': props.tripId
      })
    };

    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-specific-trip", getTripOptions)
      .then(result => result.json())
      .then(data => {
        passenger_count = data[0].passenger_count;

        intermediate_passengers = data[0].intermediate_passengers;
        if (intermediate_passengers == null) {
          intermediate_passengers = ""
        }


        intermediate_coordinates = data[0].intermediate_coordinates;
        if (intermediate_coordinates == null) {
          intermediate_coordinates = ""
        }

        intermediate_passengers += String(props.passengerId + ",");
        intermediate_coordinates += String(props.passengerLong + "," + props.passengerLat + ";");

        routeString = data[0].routeString;

        firstCoord = String(data[0].start_long + "," + data[0].start_lat);
        lastCoord = String(data[0].end_long + "," + data[0].end_lat);
      }).catch((e) => {
        console.warn(e)
      });

    passenger_count = passenger_count + 1;
    if (passenger_count == 4) {
      full_flag = 1;
    }

    let coordinateString = "";

    coordinateString += firstCoord + ";";
    coordinateString += intermediate_coordinates;
    coordinateString += lastCoord;
    let updatedRoute = fetch("https://api.mapbox.com/directions/v5/mapbox/driving/" + coordinateString
      + "?geometries=geojson&access_token=" + "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q").
      then(response => response.json()).
      then(data => {

        routeString = String(data.routes[0].geometry.coordinates);
        tripDuration = data.routes[0].duration;
      })
    //Fetch updated RouteString, 
    const acceptOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'passenger_id': props.passengerId, //WE NEED TO PASS A NEW INTERMEDIATE STOPS,INTERMEDIATE PASSENGERS AND DURATION AND ROUTE STRING
        'trip_id': props.tripId,
        'driver_id': props.driverId,
        'passenger_count': passenger_count,
        'intermediate_passengers': intermediate_passengers,
        'intermediate_coordinates': intermediate_coordinates,
        'full_flag': full_flag,
        'route_string': routeString,
        'tripDuration': tripDuration
      })
    };

    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/accept-trip-request", acceptOptions)
      .then(result => result.json())
      .then(data => {
        props.update({
          requestData: [],
          requestFoundFlag: false,
          confirmedData: [],
          confirmedFoundFlag: false
        });
      }).catch((e) => {
        console.warn(e)
      });
  }

  console.log(props.userData.data.size
    == props.total)
  return props.userData.data.size
    == props.total ? (
    <div class='pwrapper'>
      <div className='passenger-picture'>

      </div>

      <div class='pinfo_line'>
        <div class='pline'>
          <div class='ptest'>
            <PersonOutlined className='place-outlined' />
            {props.userData.data.get(props.passengerId)[0].first_name} {props.userData.data.get(props.passengerId)[0].last_name}
          </div>

          <div class='ptest'>

            <StarOutlined />
            {props.userData.data.get(props.passengerId)[0].average_rating}
          </div>
        </div>
        <div class='pline'>
          <div class='ptest'>
            <ScheduleOutlined className='place-outlined' />
            Arrive by {props.trip.arrive_time}

          </div>
        </div>
      </div>
      <div className="passenger-select-actions">
        {props.pendingPassenger ?
          null
          :
          <>
            <div className='reject-action' onClick={() => { handleRejectPassengerRequest({  userData: props.userData, 
            setUserData: props.setUserData, update: props.update, passengerId: props.passengerId, tripId: props.tripId }) }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
            </div>
            <div className='accept-action' onClick={() => { handleAcceptPassengerRequest({  userData: props.userData, 
            setUserData: props.setUserData, update: props.update, driverId: props.driverId, passengerId: props.passengerId, tripId: props.tripId, passengerLong: props.coords.long, passengerLat: props.coords.lat }) }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            </div>
          </>
        }


      </div>

    </div>

  ) : (
    <div class='pwrapper'>
      <div className='passenger-picture'>

      </div>

      <div class='pinfo_line'>
        <div class='pline'>
          <div class='ptest'>
            <PersonOutlined className='place-outlined' />
            NAME
          </div>

          <div class='ptest'>

            <StarOutlined />
            RATING
          </div>
        </div>
        <div class='pline'>
          <div class='ptest'>
            <ScheduleOutlined className='place-outlined' />
            Arrive by {props.trip.arrive_time}

          </div>
        </div>
      </div>
      <div className="passenger-select-actions">
        {props.pendingPassenger ?
          null
          :
          <>
            <div className='reject-action' onClick={() => { handleRejectPassengerRequest({  userData: props.userData, 
            setUserData: props.setUserData, update: props.update, passengerId: props.passengerId, tripId: props.tripId }) }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
            </div>
            <div className='accept-action' onClick={() => { handleAcceptPassengerRequest({  userData: props.userData, 
            setUserData: props.setUserData, update: props.update, driverId: props.driverId, passengerId: props.passengerId, tripId: props.tripId, passengerLong: props.coords.long, passengerLat: props.coords.lat }) }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
            </div>
          </>
        }


      </div>

    </div>

  )
}

function SelectPassengerBody(props) {
  var total = props.confirmed.length + props.pending.length
  console.log(total)
  let pendingPassengers = []
  let confirmedPassengers = []
  props.confirmed.forEach((passengerProps) => {

    confirmedPassengers.push(
      <PassengerTile total={total} trip={props.trip} userData={props.userData} setUserData={props.setUserData} update={props.update} passengerId={passengerProps} driverId={props.driverId} tripId={props.tripId} pendingPassnger={true} />
    )
  });
  props.pending.forEach((passengerProps) => {

    pendingPassengers.push(
      <PassengerTile total={total} trip={props.trip} userData={props.userData} setUserData={props.setUserData} update={props.update} passengerId={passengerProps.passenger_id} driverId={props.driverId} tripId={props.tripId} pendingPassnger={false} coords={{ lat: passengerProps.passenger_lat, long: passengerProps.passenger_long }} />
    )
  });
  return (
    <div class='drivers'>
      {confirmedPassengers}
      {pendingPassengers}
    </div>
  )
}

function SelectPassenger(props) {
  const [userData, setUserData] = useState({ data: new Map()});

  const location = useLocation();
  var trip_id = '';
  var intermediate_passengers_ids = [];
  if (location.trip) {

    trip_id = location.trip.trip_id;
    if (location.trip.intermediate_passengers != null) {
      intermediate_passengers_ids = location.trip.intermediate_passengers.split(',');
      intermediate_passengers_ids.pop()

    }
  }
  const [passengerIdData, setpassengerIdData] = useState({ requestData: [], requestFoundFlag: false, confirmedData: intermediate_passengers_ids, confirmedFoundFlag: false });
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'trip_id': trip_id,
    })
  };

  if (!passengerIdData.requestFoundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-a-trip-pending-requests", requestOptions)
      .then(result => result.json())
      .then(data => {
        var list_of_request = [];
        for (let request of data) {
          console.log(request)
          list_of_request.push(request);
        }
        console.log("REQUEST")
        console.log(list_of_request)
        setpassengerIdData({
          requestData: list_of_request,
          requestFoundFlag: true,
          confirmedData: passengerIdData.confirmedData,
          confirmedFoundFlag: passengerIdData.confirmedFoundFlag
        });
      }).catch((e) => {
        console.warn(e)
      });
  }

  if (!passengerIdData.confirmedFoundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-a-trip-confirmed-requests", requestOptions)
      .then(result => result.json())
      .then(data => {
        var list_of_request = [];
        for (let request of data) {
          list_of_request.push(request);
        }
        console.log("CONFIRMD")
        console.log(list_of_request)
        setpassengerIdData({
          requestData: passengerIdData.requestData,
          requestFoundFlag: passengerIdData.requestFoundFlag,
          confirmedData: list_of_request,
          confirmedFoundFlag: true
        });

      }).catch((e) => {
        console.warn(e)
      });
  }




    return (
        <BasicPage currentlySelected={2} name='Select Passengers' previousPage='/Trips' hide={false} direction={props.direction} body={SelectPassengerBody({
            userData: userData, 
            setUserData: setUserData,
            trip: location.trip,
            update: setpassengerIdData,
            tripId: trip_id,
            driverId: location.trip.driver_id,
            pending: passengerIdData.requestData,
            confirmed: passengerIdData.confirmedData})}
          default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>
    )
}

export default SelectPassenger
