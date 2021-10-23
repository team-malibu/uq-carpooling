import React, { useState } from 'react';
import BasicPage from '../../components/BasicPage'
import './Trips.css'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined, TripOrigin } from '@material-ui/icons/'
import { PassengerTripEvent, DriverTripEvent } from './TripCards.js'
import { useHistory, useLocation, Redirect } from 'react-router-dom'


function TripSwitch({ isUpcoming, ...props }) {
  const className = `switch ${isUpcoming ? "on" : "off"}`;

  return (

    <motion.div animate className={className} {...props}>
      <motion.div animate className='white'> {isUpcoming ? "Upcoming" : "Past"} </motion.div>
      <motion.div animate className='blue'> {isUpcoming ? "Past" : "Upcoming"} </motion.div>
    </motion.div>
  );
}

function GetTrips(props) {
  if (props.driver) {
    return (
      <motion.ul className='trip-list' layout initial={{ borderRadius: 25 }}>
        {props.trips.map(value => (
            //NEED A PASSENGER IP PROPS PASSED THROUGH THERE from the trip
            <DriverTripEvent trip = {value} key={value.trip_id} update_direction={props.update_direction} isUpcoming={props.isUpcoming}/>
        ))}
      </motion.ul>
    );

  } else {
    return (
      <motion.ul className='trip-list' layout initial={{ borderRadius: 25 }}>
        {props.trips.map(value => (
            <PassengerTripEvent  trip = {value} key={value.trip_id} update_direction={props.update_direction} isUpcoming={props.isUpcoming}/>
        ))}
      </motion.ul>
    )
  }
  
}
function Trips(props) {
  const [specificPassengerRequestsFound, setRequestDataFound] = useState({ data: null, foundFlag: false });
  const [asPassengerDataFound, setPassengerDataFound] = useState({ data: null, foundFlag: false, processedFlag: false, passengerPastTrips: [], passengerUpcomingTrips: []});
  const [asDriverDataFound, setDriverDataFound] = useState({ data: null, foundFlag: false, processedFlag: false,  driverPastTrips: [], driverUpcomingTrips: []});
  
  const requestOptionsPassenger = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'passenger_id': props.studentId,
    })
  };

  const requestOptionsDriver = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'driver_id': props.studentId,
    })
  };

  if (!specificPassengerRequestsFound.foundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-pending-requests-as-a-passenger", requestOptionsPassenger)
      .then(result => result.json())
      .then(data => {
        setRequestDataFound({
          data: data,
          foundFlag: true,
          processedFlag: false,
          passengerPastTrips: [],
        })

      }).catch((e) => {
        console.warn(e)
      });
  }

  if (!asPassengerDataFound.foundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-passenger-trips", requestOptionsPassenger)
      .then(result => result.json())
      .then(data => {
        setPassengerDataFound({
          data: data,
          foundFlag: true,
          processedFlag: false,
          passengerPastTrips: [],
          passengerUpcomingTrips: []
        })
      }).catch((e) => {
        console.warn(e)
      });
  }

  if (!asDriverDataFound.foundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-driver-trips", requestOptionsDriver)
      .then(result => result.json())
      .then(data => {
        setDriverDataFound({
          data: data,
          foundFlag: true,
          processedFlag: false,
          driverPastTrips: [],
          driverUpcomingTrips: []
        })
      }).catch((e) => {
        console.warn(e)
      });
  }

  if (asDriverDataFound.foundFlag && !asDriverDataFound.processedFlag) {
    var driver_date_map = new Map()

    for (const trip of Object.values(asDriverDataFound.data)) {
      driver_date_map.set(trip.date.split('T')[0], {
        'trip_id': trip.trip_id,
        'driver_id': trip.driver_id,
        'passenger_count': trip.passenger_count,
        'intermediate_passengers': trip.intermediate_passengers,
        'intermediate_stops': trip.intermediate_stops,
        'pending_requests': trip.pending_requests_flag,
        'route_string': trip.route_string,
        'arrive_time': trip.arrive_time,
        'duration': trip.duration,
        'date': trip.date.split('T')[0]
      })
    }
    var driverUpcomingTripsArray = []
    var driverPastTripsArray = []
    for (const [key, value] of driver_date_map) {
      var keyDate = new Date(key)
      if (keyDate > today) {
        driverUpcomingTripsArray.push(value)
      } else {
        driverPastTripsArray.push(value)
  
      }
    }
    setDriverDataFound({
      data: asDriverDataFound.data,
      foundFlag: true,
      processedFlag: true,
      driverPastTrips: driverPastTripsArray,
      driverUpcomingTrips: driverUpcomingTripsArray
    })
  }


  if (asPassengerDataFound.foundFlag && !asPassengerDataFound.processedFlag) {
    var passengerUpcomingTripsArray = []
    var passengerPastTripsArray = []
    var passenger_date_map = new Map()
    for (const trip of Object.values(asPassengerDataFound.data)) {
      passenger_date_map.set(trip.date.split('T')[0], {
          'trip_id': trip.trip_id,
          'driver_id': trip.driver_id,
          'passenger_count': trip.passenger_count,
          'intermediate_passengers': trip.intermediate_passengers,
          'intermediate_stops': trip.intermediate_stops,
          'pending_requests': trip.pending_requests_flag,
          'route_string': trip.route_string,
          'arrive_time': trip.arrive_time,
          'duration': trip.duration,
          'date': trip.date.split('T')[0]
        })
    }
    for (const [key, value] of passenger_date_map) {
      var keyDate = new Date(key)
      if (keyDate > today) {
        passengerUpcomingTripsArray.push(value)
      } else {
        passengerPastTripsArray.push(value)
  
      }
    }
    setPassengerDataFound({
      data: asPassengerDataFound.data,
      foundFlag: true,
      processedFlag: true,
      passengerPastTrips: passengerPastTripsArray,
      passengerUpcomingTrips: passengerUpcomingTripsArray
    })
  }

  if (specificPassengerRequestsFound.foundFlag && !specificPassengerRequestsFound.processedFlag) {
    var pendingPassengersArray = []
    var request_date_map = new Map()
    for (const trip of Object.values(specificPassengerRequestsFound.data)) {
      request_date_map.set(trip.date.split('T')[0], {
        'trip_id': trip.trip_id,
        'driver_id': trip.driver_id,
      });
      for (const [key, value] of request_date_map) {
        var keyDate = new Date(key)
        if (keyDate > today) {
          pendingPassengersArray.push(value)
        } 
      }
      setRequestDataFound({
        data: specificPassengerRequestsFound.data,
        foundFlag: true,
        processedFlag: true,
        requestTrips: pendingPassengersArray
      })
    }
  }

  const [isUpcoming, setIsUpcoming] = useState(false);
  var today = new Date()
 
  function SearchBody(props) {
    if (props.studentId == null) {
      props.update_direction(0);
      return (<Redirect to="/" />);
    }
    return (
      <>
        <TripSwitch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}>
        </TripSwitch>
        {/* <TripSwitch isUpcoming={isUpcoming} onClick={() => history.push('/Trips/Upcoming')}> 
          </TripSwitch> */}

        <AnimateSharedLayout>
          {/* <Switch>
              <Route path='/Trips/Upcoming' exact={true} component={() => <GetTrips trips={upcomingTrips} />} />
              <Route path='/Trips/Past' exact={true} component={() => <GetTrips trips={pastTrips} />} />
            </Switch> */}
          {isUpcoming ? 
          <>
          <GetTrips driver={true} trips={asDriverDataFound.driverUpcomingTrips} isUpcoming={isUpcoming} update_direction={props.update_direction} /> 
          <GetTrips driver={false} pending={false} trips={asPassengerDataFound.passengerUpcomingTrips} isUpcoming={isUpcoming} update_direction={props.update_direction} /> 
          <GetTrips driver={false} pending={true} trips={asPassengerDataFound.passengerUpcomingTrips} isUpcoming={isUpcoming} update_direction={props.update_direction} /> 
          </>
          : 
          <>
          <GetTrips  driver={true} trips={asDriverDataFound.driverPastTrips}  isUpcoming={isUpcoming} update_direction={props.update_direction}/>
          <GetTrips driver={false} trips={asPassengerDataFound.passengerPastTrips} isUpcoming={isUpcoming} update_direction={props.update_direction} /> 
          </>}{/*Somthing about this change causes it fail when unmounting*/}
        </AnimateSharedLayout>
      </>
    );
  }

  return (
    <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} key={props.location.key} custom={props.direction} update_direction={props.update_direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
  )
}






export default Trips
