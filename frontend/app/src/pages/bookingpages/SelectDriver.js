import React from 'react'
import {  useLocation } from 'react-router-dom'
import BasicPage from '../../components/BasicPage'
import DriverTile from '../../components/DriverTile'
import { Avatar} from '@material-ui/core';
import './SelectDriver.css'

function SelectDriver(props) {
  const location = useLocation();
  var possible_trips;
  var drivers = [];
  if (location.state) {
    possible_trips = location.state.data

  }
  for (const trip of Object.values(possible_trips)) {
    
    drivers.push(
      <div onClick={() => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'trip_id': trip.trip_id,
            'driver_id': trip.driver_id,
            'passenger_id': props.studentId,
            'passenger_lat': location.state.passenger_lat,
            'passenger_long': location.state.passenger_long,
          })
        };
        console.log(requestOptions)
        fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-trip-request", requestOptions)
          .then(data => {
            console.log(data)
      
          }).catch((e) => {
            console.warn(e)
          });
          console.log(trip)
      }}>
        
        <DriverTile rating= {trip.average_rating} passenger_count = {trip.passenger_count} name={trip.first_name + ' ' + trip.last_name} arrive={trip.arrive_time} driver_id={trip.driver_id}/>
      </div>
    )
  }
  
  function createTiles(props) {
    return (
      <div class='drivers'>
        {drivers}

        {/* <div onClick={() => {
            history.push('/confirm/john')
            console.log('Current direction:' + props.direction)
            props.update_direction(1)
          }}>
          <DriverTile name='John Smith' src='https://randomuser.me/api/portraits/men/54.jpg' arrive='11:45'/>
        </div>
        <div onClick={() => {
            history.push('/confirm/allen')
            props.update_direction(1)
          }}>
          <DriverTile name='Allen Walters' src='https://randomuser.me/api/portraits/men/52.jpg' arrive='10:42'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Rebecca Chester' src='https://randomuser.me/api/portraits/women/85.jpg' arrive='11:37'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Joseph Foster' src='https://randomuser.me/api/portraits/men/20.jpg' arrive='11:59'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Sonya Patchett' src='https://randomuser.me/api/portraits/women/56.jpg' arrive='10:55'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Jacob Southwick' src='https://randomuser.me/api/portraits/men/80.jpg' arrive='11:25'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Amy Stenger' src='https://randomuser.me/api/portraits/women/74.jpg' arrive='11:03'/>
        </div> */}


      </div>
    )
  }

  return (

    <BasicPage name={"Select Driver"} body={createTiles(props)} currentlySelected={0} previousPage='/book' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>

  )


}



export default SelectDriver
