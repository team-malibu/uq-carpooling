import React from 'react'
import "./TimetableTile.css"
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'

function TimetableTile(props) {
  return (
    <div>
      <div class='ttilewrapper'>
        <div class='info_line'>
          <div class='content'>
            <div>
              <ScheduleOutlined />
            </div>
            <div class='input_text'>
              {props.event.start}
            </div>
          </div>

        </div>

        <div class='info_line'>
          <div class='content'>
            <div >
              <SchoolOutlined />
            </div>
            <div class='input_text'>
              {props.event.name.split(' ')[0] + ' ' +  props.event.desc}
            </div>
          </div>
        </div>

        <div class='info_line'>
          <div class='content'>
            <div >
              <PlaceOutlined />
            </div>
            <div class='input_text'>
              {props.event.location}
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default TimetableTile
