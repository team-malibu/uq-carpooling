import React from 'react'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import './DriverTile.css'
import { Avatar } from '@material-ui/core'

function DriverTile(props) {
  return (
    <div>
      <div class='dwrapper'>
        <div class='davatar'>
          <Avatar variant='circle' style={{ height: '75px', width: '75px' }} src={props.src} />
        </div>


        {/* Add flexbox to center John Smith text */}

        <div class='dinfo_line'>
          <div class='dline'>
            <div>
              <PersonOutlined className='place-outlined' />
              {props.name}
            </div>

            <div class='drating'>
              <StarOutlined />
            </div>
          </div>
          <div class='dline'>
            <div>
              <ScheduleOutlined className='place-outlined' />
              Arrive by {props.arrive} AM

            </div>


          </div>
        </div>
      </div>
    </div>

  )
}

export default DriverTile
