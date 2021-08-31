import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'
import TripMap from '../components/TripMap'

function Book() {
    return (
        <div>
           <BlankDefaultPage currentlySelected={0} name='Book' />
            <TripMap/>
        </div>
        
    )
}

export default Book
