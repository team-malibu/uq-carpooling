import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import DriverTile from '../components/DriverTile'
import './SelectDriver.css'
import {useHistory} from 'react-router-dom'

function SelectDriver() {
  const history = useHistory();

  function createTiles() {
    return (
      <div class='drivers'>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>
        <div onClick={() => history.push('/confirm')}>
          <DriverTile />
        </div>


      </div>
    )
  }

  return (

    <BlankDefaultPage name={"Select Driver"} body={createTiles()} currentlySelected={0} />

  )


}



export default SelectDriver
