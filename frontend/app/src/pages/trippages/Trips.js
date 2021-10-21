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
        {/* <DriverTripEvent key={tripKey} update_direction={props.update_direction} event={{ start: 'start_time', name: 'event_name', location: 'location'}}/> */}
        </>
      ))}
    </motion.ul>
      )
}
function Trips(props) {
    // const [selectedId, setSelectedId] = useState(null)
    // const [tripType, setTripType] = useState('Upcoming')
    // const [isOn, setIsOn] = useState(false);
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
