import React from 'react'
import { SchoolOutlined, PlaceOutlined, EditOutlined } from '@material-ui/icons/'
import './TripTile.css'

function TripTile(props) {
  return (
      <div class='wrapper'>
        <div class='info_line'>
          <div class='content'>
            <div>
              <SchoolOutlined />
            </div>
            <input class='input_text' value={props.className} 
            placeholder={props.className} ref={props.startInputLoc}
            onChange={event => {
              props.updateLocation(event.target.value, "start");
            }}/>
            
          </div>

          <div class='edit'>
            <EditOutlined />
          </div>
        </div>

        <div class='info_line'>
          <div class='content'>
            <div >
              <PlaceOutlined />
            </div>
            <input class='input_text' placeholder={props.address} ref={props.endInputLoc}/>
          </div>

          <div class='edit'>
            <EditOutlined />
          </div>
        </div>

      </div>

  )
}

export default TripTile
