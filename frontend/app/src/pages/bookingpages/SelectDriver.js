import React from 'react'
import {  useLocation, useHistory } from 'react-router-dom'
import BasicPage from '../../components/BasicPage'
import DriverTile from '../../components/DriverTile'
import { Avatar} from '@material-ui/core';
import './SelectDriver.css'

function SelectDriver(props) {
  const location = useLocation();
  const history = useHistory();
  var possible_trips;
  var drivers = [];
  if (location.state) {
    possible_trips = location.state.data

  }
  for (const trip of Object.values(possible_trips)) {
    
    drivers.push(
      <div onClick={async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'trip_id': trip.trip_id,
            'driver_id': trip.driver_id,
            'passenger_id': props.studentId,
            'passenger_lat': location.state.passenger_lat,
            'passenger_long': location.state.passenger_long,
            'passenger_location': location.state.passenger_location
          })
        };

        await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-trip-request", requestOptions)
          .then(data => {
      
          }).catch((e) => {
            console.warn(e)
          });
          history.push('/trips')
      }}>
        
        <DriverTile rating= {trip.average_rating} passenger_count = {trip.passenger_count} name={trip.first_name + ' ' + trip.last_name} arrive={trip.arrive_time} driver_id={trip.driver_id}/>
      </div>
    )
  }
  
  function createTiles(props) {
    return (
      <div class='drivers'>
        {drivers}

      </div>
    )
  }

  return (

    <BasicPage name={"Select Driver"} body={createTiles(props)} currentlySelected={0} previousPage='/book' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>

  )


}



export default SelectDriver
