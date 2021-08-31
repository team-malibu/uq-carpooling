import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'
import TripMap from '../components/TripMap'
import TripTile from '../components/TripTile'

function Book() {
    return (
        <div>
           <BlankDefaultPage currentlySelected={0} name='Book' />
            <TripMap />
            <TripTile/>
        </div>
        
    )
}

export default Book
