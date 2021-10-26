import React, { useState }  from 'react'
import { StarOutlined, PersonOutlined, ScheduleOutlined } from '@material-ui/icons/'
import { Avatar} from '@material-ui/core';
import './DriverTile.css'

/**
 * DriverTile Component used to display relevant information about a Driver an their Trip
 * to the Passenger / User.
 * 
 */
function DriverTile(props) {
  var insert_string = props.passenger_count === 0 ? '' : '+ ' + props.passenger_count + ' others'

  const [driverData, setDriverData] = useState({data: null, foundFlag: false})
    if (!driverData.foundFlag) {
      const requestPicture = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          'student_id': props.driver_id      
        })
      };
  
      fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user-picture", requestPicture)
        .then(result => result.json())
        .then(data => {
          console.log(data);
          setDriverData({
            data: data,
            foundFlag: true,
          })
        }); 

    }

    var img = null;
    if (driverData.foundFlag) {
        const { data } = driverData.data.user_avatar;
        img = new Buffer.from(data).toString("ascii");
    }
  return (
    <div>
      <div class='dwrapper'>
      <Avatar variant='circular' className='acc-detail-avatar' style={{ height: '100%', width: '30%' }} src={img} onClick={() => {
            console.log('Avatar pressed display image picker') }} />
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
