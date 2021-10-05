import React from 'react'
import { SchoolOutlined, PlaceOutlined, EditOutlined } from '@material-ui/icons/'
import './TripTile.css'

function TripTile(props) {
  return (
      <div class='trip_wrapper'>
        <div class='trip_info_line'>
          <div class='trip_content'>
            <div>
              <SchoolOutlined />
            </div>
            <input class='trip_input_text' value={props.className} 
            placeholder={props.className} ref={props.startInputLoc}
            onChange={event => {
              props.updateLocation(event.target.value, "start");
            }}/>
            
          </div>

          <div class='trip_edit'>
            <EditOutlined />
          </div>
        </div>

        <div class='trip_info_line'>
          <div class='trip_content'>
            <div >
              <PlaceOutlined />
            </div>
            <input class='trip_input_text' placeholder={props.address} ref={props.endInputLoc}/>
          </div>

          <div class='trip_edit'>
            <EditOutlined />
          </div>
        </div>

      </div>

  )
}

export default TripTile
