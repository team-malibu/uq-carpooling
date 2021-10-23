import React, { useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined } from '@material-ui/icons/'
import './TripCards.css'
import { Link, useHistory } from "react-router-dom";


function PassengerTripEvent(props) {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div class='passenger-card-wrapper' layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <AnimatePresence>{isOpen ? <PassengerHeader /> : <motion.div class='tt_info_line'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ><div class='tt_content'>
          <div >
            <SchoolOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.passenger_count} <span> passengers</span>
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
            {props.trip.start}
          </div>
        </div>

      </div>



      <div class='tt_info_line'>
        <div class='tt_content'>
          <div >
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.location}
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <PassengerFooter trip={props.trip} />}</AnimatePresence>
    </motion.div>
  );
}

function PassengerFooter(props) {
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
      <div className="passenger-trip-actions">
        <div className='view-action'> View </div>
        <div className='cancel-action'> Cancel </div>
      </div>
    </motion.div>
  );
}

function PassengerHeader() {
  return (
    <motion.div class='passenger-event-title'
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Event_name
    </motion.div>
  );
}

function DriverHeader(props) {
  return (
    <motion.div class='driver-event-title'
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.date}
    </motion.div>
  );
}

function DriverTripEvent(props) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();


  const toggleOpen = () => setIsOpen(!isOpen);
  const classNameModifier = `${props.isUpcoming ? "upcoming" : "past"}`;

  return (
    <motion.div class='driver-card-wrapper' layout onClick={toggleOpen} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>{isOpen ? <DriverHeader date={props.trip.date} /> :  <></>}</AnimatePresence>

      <div class='tt_info_line'
        ><div class='tt_content'> {/* Date - Time */}
          <div >
          <PlaceOutlined /> {/* icon */}
          </div>
          <div class='tt_input_text'>
          {props.trip.date}  {classNameModifier}          
          </div>
        </div>
      </div>

      <div class='tt_info_line'> {/* To Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.stop_locations}
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* # passengers */}
        <div class='tt_content'>
          <div >
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
          {props.trip.passenger_count} <span> passengers</span>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <DriverFooter trip = {props.trip} isUpcoming={props.isUpcoming} update_direction={props.update_direction} />}</AnimatePresence>
    </motion.div>
  );
}

function DriverFooter(props) {
  const history = useHistory();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div class='tt_info_line'> {/*  Arrive Time   */}
        <div class='tt_content'>
          <div >
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Trip Start Locationsss
          </div>
        </div>
      </div>
      <div class='tt_info_line'> {/*  Arrive Time   */}
        <div class='tt_content'>
          <div >
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
          {props.trip.start}
          </div>
        </div>
      </div>
    {props.isUpcoming ? 
      <div className="driver-trip-actions">
          <div className='view-action' onClick={() => { /////////////////////////////////////////////////////////////////ITS HERE YOU PASS PASSENGERS FROM THE TRIP, WHY IS IT NOT RECOGNISING PROPS.EVENT
        
          }}> Manage Passengers </div>

        <div className='cancel-action'> Cancel Trip </div>
      </div>
      : 
        <Link className='review-passenger-link driver-trip-actions' to={{pathname: '/Select/Passenger', trip: props.trip}} onClick={() => {props.update_direction(1)}}>
          <div className='review-action'> Review Passengers {props.isUpcoming} </div>
        </Link>}
    </motion.div>
  );
}
export { PassengerTripEvent, DriverTripEvent }
