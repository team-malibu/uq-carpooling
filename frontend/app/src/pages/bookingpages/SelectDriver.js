import React from 'react'
import BlankDefaultPage from '../../components/BlankDefaultPage'
import DriverTile from '../../components/DriverTile'
import './SelectDriver.css'
import {useHistory} from 'react-router-dom'
import BasicPage from '../../components/BasicPage'

function SelectDriver(props) {
  const history = useHistory();

  
  function createTiles(props) {
    return (
      <div class='drivers'>
        <div onClick={() => {
            history.push('/confirm/john')
            console.log('Current direction:' + props.direction)
            props.update_direction(1)
          }}>
          <DriverTile name='John Smith' src='https://randomuser.me/api/portraits/men/54.jpg' arrive='11:45'/>
        </div>
        <div onClick={() => {
            history.push('/confirm/allen')
            props.update_direction(1)
          }}>
          <DriverTile name='Allen Walters' src='https://randomuser.me/api/portraits/men/52.jpg' arrive='10:42'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Rebecca Chester' src='https://randomuser.me/api/portraits/women/85.jpg' arrive='11:37'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Joseph Foster' src='https://randomuser.me/api/portraits/men/20.jpg' arrive='11:59'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Sonya Patchett' src='https://randomuser.me/api/portraits/women/56.jpg' arrive='10:55'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Jacob Southwick' src='https://randomuser.me/api/portraits/men/80.jpg' arrive='11:25'/>
        </div>
        <div onClick={() => {
            history.push('/confirm')
            props.update_direction(1)
          }}>
          <DriverTile name='Amy Stenger' src='https://randomuser.me/api/portraits/women/74.jpg' arrive='11:03'/>
        </div>


      </div>
    )
  }

  return (

    <BasicPage name={"Select Driver"} body={createTiles(props)} currentlySelected={0} previousPage='/book' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction}/>

  )


}



export default SelectDriver
