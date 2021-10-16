import React, { useState } from 'react';
import BasicPage from '../components/BasicPage'
import './Search.css'
import { motion } from "framer-motion";
import { MediumConfirmButton, SquareButton } from '../components/Button'
import TimetableTile from '../components/TimetableTile';
import TimeTile from '../components/TimeTile'
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined, TripOrigin } from '@material-ui/icons/'

function Switch({ isUpcoming, ...props }) {
  const className = `switch ${isUpcoming ? "on" : "off"}`;

  return (
    <motion.div animate className={className} {...props}>
      <motion.div animate />
    </motion.div>
  );
}

function PastTripTile(props) {
  return (
    <>
      <div class='ttilewrapper'>
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
function Upcoming(props) {
  return (
    <div class='search_wrapper'>
      <div class='stimetable'>
        <pre class='sdatetext'>Date</pre>
      </div>
      <div class='stimeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
      </div>
      <div class='stimetable'>
        <pre class='sdatetext'>Date</pre>
      </div>
      <div class='stimeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
      </div>
    </div>
  )
}

function Past(props) {
  return (
    <div class='search_wrapper'>
      <div class='stimetable'>
        <pre class='sdatetext'>Date</pre>
      </div>
      <div class='stimeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
      </div>
      <div class='stimetable'>
        <pre class='sdatetext'>Date</pre>
      </div>
      <div class='stimeitems'>
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
        <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location' }} />
      </div>
    </div>
  )
}
function Search(props) {
  const [selectedId, setSelectedId] = useState(null)
  const [tripType, setTripType] = useState('Upcoming')
  const [isOn, setIsOn] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [dataFound, setDataFound] = useState({ data: null, foundFlag: false });
  var request_date_map = new Map()

  var request_passenger_results;
  var trips_as_passenger_results;
  var trips_as_driver_results;

  const requestOptionsPassenger = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'passenger_id': props.studentId,
    })
  };

  const requestOptionsDriver = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'driver_id': props.studentId,
    })
  };
  if (!dataFound.foundFlag) {
    fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-trip-requests-passenger", requestOptionsPassenger)
      .then(result => result.json())
      .then(data => {
        console.log('CUNT' + data)

        // for (const trip in Object.values(data)) {

        //   request_date_map.set(trip.date.split('T'[0]), {
        //     'trip_id' : trip.trip_id,
        //     'driver_id': trip.driver_id,
        //     'passenger_count': trip.passenger_count, 
        //   })
        // }

        setDataFound({
          data: data,
          foundFlag: true
        })

      }).catch((e) => {
        console.warn(e)
      });


  }

  // fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-passenger-trips", requestOptionsPassenger)
  // .then(result => result.json())
  // .then(data => {
  //   trips_as_passenger_results = data
  //   console.log(data)

  // }).catch((e) => {
  //   console.warn(e)
  // });

  // fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-driver-trips", requestOptionsDriver)
  // .then(result => result.json())
  // .then(data => {
  //   trips_as_driver_results = data
  //   console.log(data)

  // }).catch((e) => {
  //   console.warn(e)
  // });

  // console.log(request_passenger_results)
  // console.log(trips_as_passenger_results)
  // console.log(trips_as_driver_results)
  if (dataFound.foundFlag) {
    for (const trip of Object.values(dataFound.data)) {
      request_date_map.set(trip.date.split('T')[0], {
            'trip_id' : trip.trip_id,
            'driver_id': trip.driver_id,
            'passenger_count': trip.passenger_count, 
          })
    }
  }
  console.log(request_date_map)

  function SearchBody(props) {
    //const items = [0, 1, 2];
    return (
      <>
        <Switch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}>
          <div>
          </div>
        </Switch>

        {/* <div className='trip-type-switch'>
            <div className='upcoming'>
                <div className='text-div'>Date</div>
            </div>
            <div className='past'>Past</div>

          </div> */}

        {isUpcoming ? <Upcoming /> : <Past />}



      </>
    )
  }





  return (
    // <BlankDefaultPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody}/>
    <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
  )
}

export default Search
