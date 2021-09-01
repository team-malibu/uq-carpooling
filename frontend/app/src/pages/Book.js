import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'
import TripMap from '../components/TripMap'
import TripTile from '../components/TripTile'
import {useHistory} from 'react-router-dom'
import { SquareButton } from '../components/Button'
import './Book.css'

function Book() {
  const history = useHistory();

  return (
    <div>
      <BlankDefaultPage currentlySelected={0} name='Book' />
      <div class='bbtile'>
        <TripTile />
      </div>
      <TripMap />
      <div class='bbbutton' onClick={() => history.push('/select')}>
        <SquareButton/>
      </div>

    </div>

  )
}

export default Book
