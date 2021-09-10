import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'

function Calender(props) {
    return (
        <BlankDefaultPage currentlySelected={1} name='Calendar' hide={true} direction={props.direction}/>

    )
}

export default Calender
