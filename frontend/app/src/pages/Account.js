import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'

function Account(props) {
    return (
        <BlankDefaultPage currentlySelected={3} name='Account' hide={true} direction={props.direction}/>
    )
}

export default Account
