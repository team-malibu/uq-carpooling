import React, {useState} from 'react'
import { SchoolOutlined, PlaceOutlined, EditOutlined } from '@material-ui/icons/'
import DateTimePicker from 'react-datetime-picker'
import './TripTile.css'
import Geocoder from 'react-mapbox-gl-geocoder'

const access_token = "pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q"
let locationSearchUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Brisbane.json?access_token=pk.eyJ1IjoiYWptOTkxMTUiLCJhIjoiY2tzd3FoNGpwMjFvbDJ3bzMxNHRvNW51MiJ9.6jf8xQLgnzK40TNB6SZH7Q&proximity=153.01182776135374%2C-27.500061086853854&bbox=152.91750879139477%2C-27.670452156811677%2C153.20513988226412%2C-27.33132423232297&limit=5"


function TripTile(props) {

  function updateBooking(propFlag, bookingProps) {
    props.updateBookTrip(propFlag, bookingProps)
  }

  const [arriveDate, setArriveDate] = useState();

  return (
      <div class='trip_wrapper'>
        <div class='trip_info_line'>
          <div class='trip_content' id="startingGeo">
            <div>
              <SchoolOutlined />
            </div>
            <Geocoder
                    mapboxApiAccessToken={access_token} onSelected={(markerProps) => {updateBooking("startMarker", markerProps)}} hideOnSelect={true}
                    queryParams={locationSearchUrl} initialInputValue={"Regatta"} id="startingGeo"
                />
            <div class='trip_edit'>
              <EditOutlined onClick={() => {
                let input = document.getElementById("startingGeo").childNodes[1].childNodes[0];
                input.focus();
              }} />
            </div>
          </div>

         
        </div>

        <div class='trip_info_line'>
          <div class='trip_content' id="endingGeo">
            <div >
              <PlaceOutlined />
            </div>
            <Geocoder
                    mapboxApiAccessToken={access_token} onSelected={(markerProps) => {updateBooking("endMarker", markerProps)}} hideOnSelect={true}
                    queryParams={locationSearchUrl} initialInputValue={"University of Queensland"} 
                />
            <div class='trip_edit'>
              <EditOutlined onClick={() => {
                let input = document.getElementById("endingGeo").childNodes[1].childNodes[0];
                input.focus();
              }}/>
            </div>
          </div>

        
        </div>

        <div class='trip_info_line'>
          <div class='trip_content'>
            <span>
              Arrive:
             </span> 
            <DateTimePicker onChange={(dateProps) => {
              setArriveDate(dateProps); //Necessary to update Time table DateTimePicker Value
              updateBooking("date", dateProps)
              }} value={props.start_date == '' ? arriveDate: props.start_date} />
          </div>
                
        </div>

      </div>

  )
}

export default TripTile
