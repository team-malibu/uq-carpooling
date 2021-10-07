import React from 'react'
import { SchoolOutlined, PlaceOutlined, EditOutlined } from '@material-ui/icons/'
import './TripTile.css'
import Geocoder from 'react-mapbox-gl-geocoder'

const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"
let locationSearchUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Brisbane.json?access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q&proximity=153.01182776135374%2C-27.500061086853854&bbox=152.91750879139477%2C-27.670452156811677%2C153.20513988226412%2C-27.33132423232297&limit=5"


function TripTile(props) {

  function updateMarker(startFlag, markerProps) {
    props.updateLocation(startFlag, markerProps)
  }

  return (
      <div class='trip_wrapper'>
        <div class='trip_info_line'>
          <div class='trip_content'>
            <div>
              <SchoolOutlined />
            </div>
            <Geocoder
                    mapboxApiAccessToken={access_token} onSelected={(markerProps) => {updateMarker("start", markerProps)}} hideOnSelect={true}
                    queryParams={locationSearchUrl}
                />
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
            <Geocoder
                    mapboxApiAccessToken={access_token} onSelected={(markerProps) => {updateMarker("end", markerProps)}} hideOnSelect={true}
                    queryParams={locationSearchUrl} initialInputValue={"University of Queensland"}
                />
          </div>

          <div class='trip_edit'>
            <EditOutlined />
          </div>
        </div>

      </div>

  )
}

export default TripTile
