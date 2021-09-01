import React from 'react'
import { MediumConfirmButton } from '../components/Button'
import BlankDefaultPage from '../components/BlankDefaultPage'
import DriverTile from '../components/DriverTile'
import TripTile from '../components/TripTile'
import './ConfirmDriver.css'
import {useHistory} from 'react-router-dom'

function ConfirmDriver() {
  const history = useHistory();

  function createBody() {
    return (
      <div class='cwrapper'>
        <div class= 'ccontainer'>
          Trip
          <TripTile class_name='DECO3801 Build Studio 3' address="Test Address" />
        </div>
        <div class= 'ccontainer'>
          Driver
          <DriverTile />
        </div>

        <div class= 'ccontainer' onClick={() => history.push('/rating')}>
          <MediumConfirmButton name='Confirm' />
        </div>
        
      </div>
    )
  }

  return (

    <BlankDefaultPage name={"Confirm Driver"} body={createBody()} currentlySelected={0} />

  )


}



export default ConfirmDriver
