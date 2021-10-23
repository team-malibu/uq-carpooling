import React from 'react'
import BasicPage from '../../components/BasicPage'

function TripVisualiser(props) {
    return (
        <BasicPage currentlySelected={2} name='Trip Visualiser' hide={true} direction={props.direction} key={props.location.key} custom={props.direction} update_direction={props.update_direction} body={<></>} default={props.default} key={props.key} custom={props.custom} />
    )
}

export default TripVisualiser
