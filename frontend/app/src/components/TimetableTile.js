import React from 'react'
import "./TimetableTile.css"
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined } from '@material-ui/icons/'
import { useHistory } from 'react-router-dom'

/**
 * The TimetableTile component is used to display information parsed from the user's
 * UQ Timetable, being their class name, start time and location. Upon clicking this
 * they are sent to the Booking page with UQ, and their class start time pre-filled.
 * 
 */
function TimetableTile(props) {
  const history = useHistory();
  return (
    <>
      <div class='ttilewrapper' onClick={() => {
        props.update_direction(-1)
        history.push({
          pathname: '/book',
          state: {
            props: props.event,
            homeDetails: props.homeDetails
          }
        })
      }}>
        <div class='tt_info_line'> 
          <div class='tt_content'>
            <div>
              <ScheduleOutlined />
            </div>
            <div class='tt_input_text'>
              {props.event.start}
            </div>
          </div>

        </div>

        <div class='tt_info_line'>
          <div class='tt_content'>
            <div >
              <SchoolOutlined />
            </div>
            <div class='tt_input_text'>
              {props.event.name.split(' ')[0] + ' ' + props.event.desc}
            </div>
          </div>
        </div>

        <div class='tt_info_line'>
          <div class='tt_content'>
            <div >
              <PlaceOutlined />
            </div>
            <div class='tt_input_text'>
              {props.event.location}
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default TimetableTile
