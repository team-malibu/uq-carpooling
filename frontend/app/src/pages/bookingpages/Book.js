import React, { useEffect, useState } from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'
import TripMap from '../components/TripMap'
import TripTile from '../components/TripTile'
import {useHistory} from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../components/Button'
import './Book.css'

function Book() {
  const history = useHistory();
  let [startLoc, setStartLoc] = useState("");
  let [endLoc, setEndLoc] = useState("");
  
  let updateLocation = ((location, flag) => {
    if (flag.match("start")) {
      setStartLoc(location); 
    } else {
      setEndLoc(location);
    }
  })

  return(
    <div>
      <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/>
      <div class='bbtile'>
        <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland'
          updateLocation={updateLocation}/>
      </div>
      <TripMap locations={startLoc, endLoc} /> 
      <div class='bbbutton' onClick={() => history.push('/select')}>
        <LargeConfirmButton name = "Find trips"/>
      </div>
    </div>
  )
}

export default Book
