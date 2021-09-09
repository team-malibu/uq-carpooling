import React from 'react'
import { MediumConfirmButton } from '../../components/Button'
import BlankDefaultPage from '../../components/BlankDefaultPage'
import DriverTile from '../../components/DriverTile'
import TripTile from '../../components/TripTile'
import '../ConfirmDriver.css'
import {useHistory} from 'react-router-dom'


function ConfirmAllen(rops) {
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
          <DriverTile name='Allen Walters' src='https://randomuser.me/api/portraits/men/52.jpg' arrive='10:42'/>
        </div>

        <div class= 'ccontainer' onClick={() => history.push('/rating')}>
          <MediumConfirmButton name='Confirm' />
        </div>
        
      </div>
    )
  }

  return (

    <BlankDefaultPage name={"Confirm Driver"} body={createBody()} currentlySelected={0} previousPage='/Select' />

  )


}



export default ConfirmAllen
