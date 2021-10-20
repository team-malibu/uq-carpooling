import React, { useState } from 'react';
import BasicPage from '../../components/BasicPage'
import './Search.css'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined} from '@material-ui/icons/'
import { PassengerTripEvent, DriverTripEvent } from './TripCards.js'

function Switch({ isUpcoming, ...props}) {
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
    <motion.ul className='trip-list' layout initial={{ borderRadius: 25 }}>
      {props.trips.map(tripKey => (
        <>
        <PassengerTripEvent key={tripKey} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
        <DriverTripEvent key={tripKey} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/>
        </>
      ))}
    </motion.ul>
      )
}
function Search(props) {
    // const [selectedId, setSelectedId] = useState(null)
    // const [tripType, setTripType] = useState('Upcoming')
    // const [isOn, setIsOn] = useState(false);
    const [isUpcoming, setIsUpcoming] = useState(false);
    
    function SearchBody(props) {
        const upcomingTrips = ['x', 'y'];
        const pastTrips = ['a'];
        return (
          <>
          <Switch isUpcoming={isUpcoming} onClick={() => setIsUpcoming(!isUpcoming)}> 
          </Switch>          
          <AnimateSharedLayout>
            {isUpcoming ? <Trips trips={upcomingTrips} /> : <Trips trips={pastTrips} />}
          </AnimateSharedLayout>
        </>
      );
    }
      
    return (
        <BasicPage currentlySelected={2} name='Trips' hide={true} direction={props.direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
    )
}






export default Search
