import React from 'react'
import { MediumConfirmButton } from '../../../components/Button'
import DriverTile from '../../../components/DriverTile'
import TripTile from '../../../components/TripTile'
import './ConfirmDriver.css'
import {useHistory} from 'react-router-dom'
import BasicPage from '../../../components/BasicPage'

function ConfirmDriver(props) {
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
          <DriverTile name='John Smith' src='https://randomuser.me/api/portraits/men/54.jpg' arrive='11:45'/>
        </div>

        <div class= 'ccontainer' onClick={() => {
            history.push('/rating')
            props.update_direction(1)
          }}>
          <MediumConfirmButton name='Confirm' />
        </div>
        
      </div>
    )
  }

  return (

    <BasicPage name={"Confirm Driver"} body={createBody()} currentlySelected={0} previousPage='/Select' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>

  )


}



export default ConfirmDriver
