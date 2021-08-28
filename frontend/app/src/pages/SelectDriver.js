import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import './SelectDriver.css'

function SelectDriver() {

  function createTiles() {
    return (
      <div class='drivers'>
        Test
      </div>
    )
  }

  return (

    <BlankDefaultPage body={createTiles()} />

  )

  
}



export default SelectDriver
