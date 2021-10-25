import React, { useState } from 'react';
import BasicPage from '../components/BasicPage'
import './Search.css'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { MediumConfirmButton, SquareButton } from '../components/Button'
import TimetableTile from '../components/TimetableTile';
import TimeTile from '../components/TimeTile'
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined, TripOrigin } from '@material-ui/icons/'

function Switch({ isUpcoming, ...props }) {
  const className = `switch ${isUpcoming ? "on" : "off"}`;

    return (

        <motion.div animate className={className} {...props}>
          
          <motion.div animate className='white'> {isUpcoming ? "Upcoming" : "Past"} </motion.div>

          <motion.div animate className='blue'> {isUpcoming ? "Past" : "Upcoming"} </motion.div>
        </motion.div>
      );
}


function Trips(props) {
  return(
    <motion.ul layout initial={{ borderRadius: 25 }}>
      {props.trips.map(tripKey => (
        <Item key={tripKey} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
      ))}
    </motion.ul>
      )
}
function Search(props) {
    // const [selectedId, setSelectedId] = useState(null)
    // const [tripType, setTripType] = useState('Upcoming')
    // const [isOn, setIsOn] = useState(false);
    const [requestDataFound, setRequestDataFound] = useState({ data: null, foundFlag: false });
    // const [requestDataFound, setRequestDataFound] = useState({ data: null, foundFlag: false });
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
    if (!requestDataFound.foundFlag) {
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
  
          setRequestDataFound({
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
    if (requestDataFound.foundFlag) {
      for (const trip of Object.values(requestDataFound.data)) {
        request_date_map.set(trip.date.split('T')[0], {
              'trip_id' : trip.trip_id,
              'driver_id': trip.driver_id,
              'passenger_count': trip.passenger_count, 
            })
      }
    }
    console.log(request_date_map)
  
    const [isUpcoming, setIsUpcoming] = useState(false);
    
    function SearchBody(props) {
        const upcomingTrips = ['x', 'y', 'z'];
        const pastTrips = ['a', 'b', 'c']
        return (
          <>
          <Switch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}> 
          </Switch>
          {/* {isUpcoming ? <Upcoming /> : <Past />} */}
          
          <AnimateSharedLayout>
            {isUpcoming ? <Trips trips={upcomingTrips} /> : <Trips trips={pastTrips} />}
            {/* <motion.ul layout initial={{ borderRadius: 25 }}>
              {upcomingTrips.map(tripKey => (
                <Item key={tripKey} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
              ))}
            </motion.ul> */}
          </AnimateSharedLayout>          {/* <PastTripTile event={{ start: 'start_time', name: 'event_name', location: 'location'}} /> */}
        </>
      );
    }
      
    return (
        <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
    )
}

function Item(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div class='ttilewrapper' layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
    <AnimatePresence>{isOpen ? <Header />: <motion.div class='tt_info_line'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ><div class='tt_content'>
          <div >
            <SchoolOutlined />
          </div>
          <div class='tt_input_text'>
            {props.event.name.split(' ')[0] + ' ' +  props.event.desc}
          </div>
        </div>
      </motion.div>
    }
    </AnimatePresence>
    
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
           <PlaceOutlined />
         </div>
         <div class='tt_input_text'>
           {props.event.location}
         </div>
       </div>
     </div>
     <AnimatePresence>{isOpen && <Footer />}</AnimatePresence>
   </motion.div> 
  );
}

function Footer() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div class='tt_info_line'>
       <div class='tt_content'>
         <div >
           <PlaceOutlined />
         </div>
         <div class='tt_input_text'>
           Pick up location
         </div>
       </div>
     </div>
     <div class='tt_info_line'>
       <div class='tt_content'>
         <div >
           <PlaceOutlined />
         </div>
         <div class='tt_input_text'>
           Driver
         </div>
       </div>
     </div>
     <div class='tt_info_line'>
       <div class='tt_content'>
         <div >
           <PlaceOutlined />
         </div>
         <div class='tt_input_text'>
           Passengers: 3/4
         </div>
       </div>
     </div>
     <div className="trip-actions">
       <div className='view-action'> View </div>
       <div className='cancel-action'> Cancel </div>
     </div>
    </motion.div>
  );
}

function Header() {
  return (
    <motion.div class='tdatetext'
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Event_name
    </motion.div>
  );
}


const items = [0, 1, 2];
export default Search
