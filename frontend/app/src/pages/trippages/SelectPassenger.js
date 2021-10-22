import { React, useState } from 'react'
import BasicPage from '../../components/BasicPage'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import { useLocation } from 'react-router-dom'
import './SelectPassenger.css'

function PassengerTile(props) {

  return (
    <div>
      <div class='pwrapper'>
        <div className='passenger-picture'>

        </div>

        <div class='pinfo_line'>
          <div class='pline'>
            <div class='ptest'>
              <PersonOutlined className='place-outlined' />
              {props.name}
            </div>

            <div class='ptest'>

              <StarOutlined />
              {props.rating}
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

          <div className='reject-action'>
            <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
          </div>
          <div className='accept-action'>
            <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7a599b"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
          </div>

        </div>

      </div>
    </div>

  )
}

function SelectPassengerBody(props) {

  return (
    <>
      <div class='drivers'>
        <PassengerTile props={props} />
        <PassengerTile />
        <PassengerTile />
        <PassengerTile />

      </div>
    </>
  )
}

function SelectPassenger(props) {
  const [passengersDataFound, setPassengerDataFound] = useState({ data: null, foundFlag: false });
  const [usersDataFound, setUserDataFound] = useState({ data: null, foundFlag: false })

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
          foundFlag: true
        })

      }).catch((e) => {
        console.warn(e)
      });
  }

  if (passengersDataFound.foundFlag && !usersDataFound.foundFlag) {
    var userData = []


    for (var value of Object.values(passengersDataFound.data)) {
      console.log(value)
      const userOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'student_id': value.passenger_id,
        })
      };

      fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user/get", userOptions)
        .then(result => result.json())
        .then(data => {
          userData.push(data)
          
        }).catch((e) => {
          console.warn(e)
        });
    }

  

    setUserDataFound({
      data: userData,
      foundFlag: true
    })

  }


  console.log('PASSENFER DATA')
  console.log(passengersDataFound.data)
  console.log('USER DATA')
  console.log(usersDataFound.data)
  
  var body = () => {
    console.log("CUNT")
    if (passengersDataFound.foundFlag && usersDataFound.foundFlag) {
      var passengerTiles = []
      for (const values of Object.values(usersDataFound.data)) {
        console.log("CUNT3")
        
        var value = values.pop()
        if (value) {
          passengerTiles.push(<PassengerTile name={value.first_name + ' ' + value.last_name} rating={value.average_rating} />)
        }
       
      }
  
      return (<div class='drivers'>
        {passengerTiles}
  
      </div>)
    } else {
      console.log("CUNT2")
      return
    }
   
  }



  return (
    <BasicPage currentlySelected={2} name='Select Passengers' previousPage='/Trips' hide={false} direction={props.direction} body={body()} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction} />
  )
}

export default SelectPassenger
