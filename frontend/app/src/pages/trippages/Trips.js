import React, { useState } from 'react';
import BasicPage from '../../components/BasicPage'
import './Trips.css'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'
import { PassengerTripEvent, DriverTripEvent } from './TripCards.js'
import { Route, Switch, useHistory } from 'react-router-dom';


function TripSwitch({ isUpcoming, ...props}) {
    const className = `switch ${isUpcoming ? "on" : "off"}`;

    return (

        <motion.div animate className={className} {...props}>
          
          <motion.div animate className='white'> {isUpcoming ? "Upcoming" : "Past"} </motion.div>

          <motion.div animate className='blue'> {isUpcoming ? "Past" : "Upcoming"} </motion.div>
        </motion.div>
      );
}


function GetTrips(props) {
  return(
    <motion.ul className='trip-list'layout initial={{ borderRadius: 25 }}>
      {props.trips.map(tripKey => (
        <>
        <PassengerTripEvent key={tripKey} update_direction={props.update_direction} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
        <DriverTripEvent key={tripKey} update_direction={props.update_direction} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
        </>
      ))}
    </motion.ul>
      )
}
function Trips(props) {
   // const [selectedId, setSelectedId] = useState(null)
    // const [tripType, setTripType] = useState('Upcoming')
    // const [isOn, setIsOn] = useState(false);
    const [requestDataFound, setRequestDataFound] = useState({ data: null, foundFlag: false });
    const [asPassengerDataFound, setPassengerDataFound] = useState({ data: null, foundFlag: false });
    const [asDriverDataFound, setDriverDataFound] = useState({ data: null, foundFlag: false });
    var request_date_map = new Map()
    var passenger_date_map = new Map()
    var driver_date_map = new Map()
  
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

    if (!requestDataFound.foundFlag) {
      fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-trip-requests-passenger", requestOptionsPassenger)
        .then(result => result.json())
        .then(data => {
          setRequestDataFound({
            data: data,
            foundFlag: true
          })
  
        }).catch((e) => {
          console.warn(e)
        });
    }

    if (!asDriverDataFound.foundFlag) {
      fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-driver-trips", requestOptionsDriver)
        .then(result => result.json())
        .then(data => {
          setDriverDataFound({
            data: data,
            foundFlag: true
          })
  
        }).catch((e) => {
          console.warn(e)
        });
    }

    // if (!asPassengerDataFound.foundFlag) {
    //   fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/get-passenger-trips", requestOptionsPassenger)
    //     .then(result => result.json())
    //     .then(data => {
    //       setPassengerDataFound({
    //         data: data,
    //         foundFlag: true
    //       })
  
    //     }).catch((e) => {
    //       console.warn(e)
    //     });

    // }
  
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

    if (requestDataFound.foundFlag) {
      for (const trip of Object.values(requestDataFound.data)) {
        request_date_map.set(trip.date.split('T')[0], {
              'trip_id' : trip.trip_id,
              'driver_id': trip.driver_id,
              'passenger_count': trip.passenger_count, 
            })
      }
    }

    if (asDriverDataFound.foundFlag) {
      for (const trip of Object.values(asDriverDataFound.data)) {
        driver_date_map.set(trip.date.split('T')[0], {
              'trip_id' : trip.trip_id,
              'driver_id': trip.driver_id,
              'passenger_count': trip.passenger_count, 
            })
      }
    }

    // if (asPassengerDataFound.foundFlag) {
    //   for (const trip of Object.values(requestDataFound.data)) {
    //     passenger_date_map.set(trip.date.split('T')[0], {
    //           'trip_id' : trip.trip_id,
    //           'driver_id': trip.driver_id,
    //           'passenger_count': trip.passenger_count, 
    //         })
    //   }
    // }

    console.log("Requested Trips")
    console.log(request_date_map)
    console.log("Driver Trips")
    console.log(driver_date_map)
    // console.log("Actual Trips")
    // console.log(passenger_date_map)
  
    const [isUpcoming, setIsUpcoming] = useState(false);
    const history = useHistory();

    
    function SearchBody(props) {
        const upcomingTrips = ['x', 'y'];
        const pastTrips = ['a'];
        return (
          <>
          <TripSwitch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}> 
          </TripSwitch>
          {/* <TripSwitch isUpcoming={isUpcoming} onClick={() => history.push('/Trips/Upcoming')}> 
          </TripSwitch> */}
               
          <AnimateSharedLayout>
            {/* <Switch>
              <Route path='/Trips/Upcoming' exact={true} component={() => <GetTrips trips={upcomingTrips} />} />
              <Route path='/Trips/Past' exact={true} component={() => <GetTrips trips={pastTrips} />} />
            </Switch> */}
            {isUpcoming ? <GetTrips trips={upcomingTrips} update_direction={props.update_direction} /> : <GetTrips trips={pastTrips} update_direction={props.update_direction}/>}{/*Somthing about this change causes it fail when unmounting*/}

          </AnimateSharedLayout>
        </>
      );
    }
      
    return (
        <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} key={props.location.key} custom={props.direction} update_direction={props.update_direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
    )
}






export default Trips