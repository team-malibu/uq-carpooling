import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined, GroupOutlined, DriveEtaOutlined } from '@material-ui/icons/'
import './TripCards.css'
import { Link, useHistory } from "react-router-dom";


function PassengerTripEvent(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const classNameModifier = `${props.isUpcoming ? "upcoming" : "past"}`;

  return (
    <motion.div class='passenger-card-wrapper' layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <AnimatePresence>{isOpen ? <PassengerHeader date={props.trip.date} pending={props.pending} /> :
        <motion.div class='tt_info_line'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        </motion.div>
      }
      </AnimatePresence>
      <div class='tt_info_line'>
        <div class='tt_content'> {/* Date - Time */}
          <div >
            <ScheduleOutlined /> {/* icon */}
          </div>
          <div class='tt_input_text'>
            {props.trip.arrive_time} arrival
          </div>
        </div>
      </div>

      <div class='tt_info_line'> {/* To Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            University of Queensland
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* # passengers */}
        <div class='tt_content'>
          <div >
            <GroupOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.passenger_count} <span> passengers</span>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <PassengerFooter history={history} trip={props.trip} pending={props.pending} isUpcoming={props.isUpcoming} update_direction={props.update_direction} />}</AnimatePresence>
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
            {props.pending ? "Pickup PENDING" : "Pick up location"}
          </div>
        </div>
      </div>
      <div class='tt_info_line'> {/*  Arrive Time   */}
        <div class='tt_content'>
          <div >
            <DriveEtaOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.driver_first_name} {props.trip.driver_last_name}
          </div>
        </div>
      </div>
      <div className="passenger-trip-actions">
        {props.isUpcoming ? null :
          <div onClick={
            props.history.push({
              'pathname':'/rating',
              'state': {
                'driver_id': props.trip.drive_id,
                'trip_id': props.trip.trip_id,
                'passenger_id': props.student_id,
              }
            })
          }>
          Rate Trip
          </div>
          }
       <Link className='driver-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
            <div className='driver-view-action'> View Trip </div>
        </Link>
      <div className='cancel-action'> Cancel </div>
    </div>
    </motion.div >
  );
}

function PassengerHeader(props) {
  return (
    <motion.div class='passenger-event-title'
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.date}{props.pending ? ' PENDING' : null}
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


  const toggleOpen = () => setIsOpen(!isOpen);
  const classNameModifier = `${props.isUpcoming ? "upcoming" : "past"}`;

  return (
    <motion.div class='driver-card-wrapper' layout onClick={toggleOpen} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>{isOpen ? <DriverHeader date={props.trip.date} /> : <></>}</AnimatePresence>

      <div class='tt_info_line'>
        <div class='tt_content'> {/* Date - Time */}
          <div >
            <ScheduleOutlined /> {/* icon */}
          </div>
          <div class='tt_input_text'>
            {props.trip.arrive_time} arrival
          </div>
        </div>
      </div>

      <div class='tt_info_line'> {/* To Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            University of Queensland
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* # passengers */}
        <div class='tt_content'>
          <div >
            <GroupOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.passenger_count} <span> passengers</span>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && <DriverFooter trip={props.trip} isUpcoming={props.isUpcoming} update_direction={props.update_direction} />}</AnimatePresence>
    </motion.div>
  );
}

function DriverFooter(props) {
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
            {props.trip.start_lat} Lat, {props.trip.start_long} Long
          </div>
        </div>
      </div>
      <div class='tt_info_line'> {/*  Arrive Time   */}
        <div class='tt_content'>
          <div >
            <DriveEtaOutlined />
          </div>
          <div class='tt_input_text'>
            You
          </div>
        </div>
      </div>
      {props.isUpcoming ?
        <div className="upcoming-driver-trip-actions">
          <Link className='driver-manage-action' to={{ pathname: '/Select/Passenger', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
            <div className='driver-manage-action'> Manage Passengers</div>
          </Link>
          <div className='driver-cancel-action'> Cancel Trip </div>
        </div>
        :
        <Link className='review-passenger-link driver-trip-actions' to={{ pathname: '/Select/Passenger', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
          <div className='review-action'> Review Passengers</div>
        </Link>}
        <Link className='driver-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
            <div className='driver-view-action'> View Trip </div>
        </Link>
    </motion.div>
  );
}
export { PassengerTripEvent, DriverTripEvent }
