import React from 'react'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import './DriverTile.css'

/**
 * DriverTile Component used to display relevant information about a Driver an their Trip
 * to the Passenger / User.
 * 
 */
function DriverTile(props) {
  var insert_string = props.passenger_count === 0 ? '' : '+ ' + props.passenger_count + ' others'
  return (
    <div>
      <div class='dwrapper'>
        <div class='dinfo_line'>
          <div class='dline'>
            <div class='dtest'>
              <PersonOutlined className='place-outlined' />
              {props.name} {insert_string}
            </div>

            <div class='dtest'>

              <StarOutlined />
              {props.rating}
            </div>
          </div>
          <div class='dline'>
            <div class='dtest'>
              <ScheduleOutlined className='place-outlined' />
              Arrive by {props.arrive}

            </div>


          </div>
        </div>
      </div>
    </div>

  )
}

export default DriverTile
