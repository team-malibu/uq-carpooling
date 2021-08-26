import React from 'react'
import { SchoolOutlined, PlaceOutlined, EditOutlined } from '@material-ui/icons/'
import './TripTile.css'

function TripTile(props) {
  return (
    <div>
      <div class='wrapper'>
        <div class='info_line'>
          <div class='content'>
            <div>
              <SchoolOutlined />
            </div>
            <div class='input_text'>
              {props.class_name}
            </div>
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
            <div class='input_text'>
              {props.address}
            </div>
          </div>

          <div class='edit'>
            <EditOutlined />
          </div>
        </div>

      </div>
    </div>

  )
}

export default TripTile
