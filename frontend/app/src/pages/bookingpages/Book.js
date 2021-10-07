import React, { useEffect, useState } from 'react'
import TripMap from '../../components/TripMap'
import TripTile from '../../components/TripTile'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../../components/Button'
import './Book.css'
import BasicPage from '../../components/BasicPage'

function Book(props) {
  const history = useHistory();
  let [startLoc, setStartLoc] = useState(0);
  let [endLoc, setEndLoc] = useState(0);
  
  function updateLocation(flag, locationProps) {
   
    if (flag.match("start")) {

      setStartLoc([locationProps.longitude, locationProps.latitude]); 
    } else {
      
      setEndLoc([locationProps.longitude, locationProps.latitude]);
    }
  }

  function createBook(props) {
    return (
      <div class="booking-container">
        {/* <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/> */}
        <div class='booktile'>
        <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland'
          updateLocation={updateLocation}/>
        </div>
        <div class="bookmap">
          <TripMap locations={[startLoc, endLoc]} /> 
        </div>
          <div class='bookbutton' onClick={() => {
          history.push('/select')
          props.update_direction(1)}}>
          <LargeConfirmButton name="Find trips" />
        </div>
      </div>
    )
  }

  return (

    // <BlankDefaultPage name={"Book"} body={createBook()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"Book"} body={createBook(props)} currentlySelected={0} hide={props.hide} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )


}

export default Book
