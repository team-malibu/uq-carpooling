import React from 'react'
import "./TimetableTile.css"
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'
import {useHistory} from 'react-router-dom'


function TimetableTile(props) {
  const history = useHistory();
  console.log(props)
  
  return (
    <>
      <div class='ttilewrapper' onClick={() => {
         console.log('tile clicked')
         props.update_direction(-1)

         history.push({
           pathname: '/book',
           state: {
             props: props.event,
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
              {props.event.name.split(' ')[0] + ' ' +  props.event.desc}
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
