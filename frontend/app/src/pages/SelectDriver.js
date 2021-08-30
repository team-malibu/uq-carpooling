import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import DriverTile from '../components/DriverTile'
import './SelectDriver.css'

function SelectDriver() {

  function createTiles() {
    return (
      <div class='drivers'>
        <div>
          <DriverTile />
        </div>
        <div>
          <DriverTile />
        </div>
        <div>
          <DriverTile />
        </div>
        <div>
          <DriverTile />
        </div>
        <div>
          <DriverTile />
        </div>
        <div>
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
