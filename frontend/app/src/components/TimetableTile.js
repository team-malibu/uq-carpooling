import React from 'react'
import "./TimetableTile.css"
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'

function TimetableTile() {
  return (
    <div>
      <div class='ttilewrapper'>
        <div class='info_line'>
          <div class='content'>
            <div>
              <ScheduleOutlined />
            </div>
            <div class='input_text'>
              4:00 PM Thusday, 9 Sep
            </div>
          </div>

        </div>

        <div class='info_line'>
          <div class='content'>
            <div >
              <SchoolOutlined />
            </div>
            <div class='input_text'>
              DECO3801 Build Studio 3
            </div>
          </div>
        </div>

        <div class='info_line'>
          <div class='content'>
            <div >
              <PlaceOutlined />
            </div>
            <div class='input_text'>
              Deno's Kebabs, St Lucia Village
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default TimetableTile
