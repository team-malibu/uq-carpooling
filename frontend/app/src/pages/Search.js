import React from 'react'
import BlankDefaultPage from '../components/BlankDefaultPage'
import Navbar from '../components/Navbar'


function Search(props) {

    function CreateBody() {
        return (
            <div width='100px' height='100px' background-color='red' />)
    }
    return (
        <BlankDefaultPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody}/>
    )
}

export default Search
