import React from 'react'
import BasicPage from '../../components/BasicPage'

function Account(props) {
    return (
        
        <BasicPage currentlySelected={3} name='Account' hide={props.hide}  default={props.default} direction={props.direction} key={props.key} custom={props.custom} />
    )
}

export default Account
