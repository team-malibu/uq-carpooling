import {React, useState } from 'react'
import BasicPage from '../../components/BasicPage'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import { useLocation } from 'react-router-dom'
import './SelectPassenger.css'

//Does this need to go to a different file????
function PassengerTile(props) {
  
  async function handleRejectPassengerRequest(props) {
    //Fetch Calls to update db here
    const rejectionOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'passenger_id': props.studentId,//THIS IS WRONG AND NEEDS TO BE THE PASSENGER OF THE TILE
        'trip_id': props.trip_id
      })
    };
  
    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/deny-trip-request", rejectionOptions)
        .then(result => result.json())
        .then(data => {
          //Cause a state update somewhere
        }).catch((e) => {
          console.warn(e)
        });
  }
  async function handleAcceptPassengerRequest(props) {
    const acceptOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'passenger_id': props.studentId,//THIS IS WRONG AND NEEDS TO BE THE PASSENGER OF THE TILE
        'trip_id': props.trip_id
      })
    };
  
    await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/accept-trip-request", acceptOptions)
        .then(result => result.json())
        .then(data => {
          //Cause a state update somewhere
        }).catch((e) => {
          console.warn(e)
        });
  }

    return (
      <div>
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
                Arrive by TIME
  
              </div>
            </div>
          </div>
          <div className="passenger-select-actions">
        {props.pendingPassnger ?  
          <>
            <div className='reject-action' onClick={() => {handleRejectPassengerRequest({passenger_id: props.passenger_id, trip_id: props.trip_id})}}>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            <div className='accept-action' onClick={() => {handleAcceptPassengerRequest({passenger_id: props.passenger_id, trip_id: props.trip_id})}}> 
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            </div>
          </>: null}
         
            
        </div>

        </div>
      </div>
  
    )
  }

function SelectPassengerBody(props) {
    let pendingPassengers = []
    let confirmedPassengers = []
    props.confirmed.forEach((passengerProps) => {
      console.log(passengerProps)
      confirmedPassengers.push(
        <PassengerTile props={passengerProps} pendingPassnger={true}/>
      )
    });
    props.pending.forEach((passengerProps) => {
      confirmedPassengers.push(
        <PassengerTile props={passengerProps} pendingPassnger={false}/>
      )
    });
    return (
        <>
        <div class='drivers'>
            {confirmedPassengers}
            {pendingPassengers}
        </div>
        </>
    )
}

function SelectPassenger(props) {
  const [passengersDataFound, setPassengerDataFound] = useState({ data: [], foundFlag: false });
  const location = useLocation();
  var trip_id;
  if (location.state) {
    trip_id = location.state.trip_id
  } else {
    trip_id = ''
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'trip_id': trip_id,
    })
  };

  if (!passengersDataFound.foundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-a-trip-pending-requests", requestOptions)
      .then(result => result.json())
      .then(data => {


        setPassengerDataFound({
          data: data,
          foundFlag: true,
        })

      }).catch((e) => {
        console.warn(e)
      });
  }



    return (
        <BasicPage currentlySelected={2} name='Select Passengers' previousPage='/Trips' hide={false} direction={props.direction} body={SelectPassengerBody({pending: passengersDataFound.data, confirmed: []})} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>
    )
}

export default SelectPassenger
