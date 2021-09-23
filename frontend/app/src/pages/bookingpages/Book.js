import React from 'react'
import TripMap from '../../components/TripMap'
import TripTile from '../../components/TripTile'
import { useHistory } from 'react-router-dom'
import { LargeConfirmButton, SquareButton } from '../../components/Button'
import './Book.css'
import BasicPage from '../../components/BasicPage'

function Book(props) {

  const history = useHistory();

  function createBook(props) {
    return (
      <>
        {/* <BlankDefaultPage currentlySelected={0} name='Book' previousPage='/Timetable' hide={true}/> */}
        <div class='bbtile'>
          <TripTile class_name='DECO3801 Build Studio 3' address='University of Queensland' />
        </div>
        <TripMap />
        <div class='bbbutton' onClick={() => {
          history.push('/select')
          props.update_direction(1)}}>
          <LargeConfirmButton name="Find trips" />
        </div>
      </>
    )

  }

  return (

    // <BlankDefaultPage name={"Book"} body={createBook()} currentlySelected={0} previousPage='/Timetable' hide={true} direction={props.direction}/>
    <BasicPage name={"Book"} body={createBook(props)} currentlySelected={0} hide={true} direction={props.direction} default={props.default} key={props.key} custom={props.custom} />

  )


}

export default Book
