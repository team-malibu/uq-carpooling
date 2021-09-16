import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'
import BasicPage from '../components/BasicPage'

function Search(props) {

    function CreateBody() {
        return (
            <div width='100px' height='100px' background-color='red' />)
    }
    return (
        // <BlankDefaultPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody}/>
        <BasicPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody} default={props.default} key={props.key} custom={props.custom} />
    )
}

export default Search
