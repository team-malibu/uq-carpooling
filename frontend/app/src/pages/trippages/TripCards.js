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
            Estimated arrival: {props.trip.arrive_time}
          </div>
        </div>
      </div>

      <div class='tt_info_line'> {/* Start Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Starting at {props.trip.start_location}
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* To Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Finishing at {props.trip.end_location}
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* # passengers */}
        <div class='tt_content'>
          <div >
            <GroupOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.passenger_count} <span> passenger(s)</span>
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
        {props.isUpcoming ?  
        <>
        <Link className='passenger-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
            <div className='passenger-view-action'> View Trip </div>
        </Link>
        <div className='cancel-action'> Cancel </div>
        </>
         :
          <>
          <Link className='review-action' to={{ pathname: '/Rating', trip: props.trip}} onClick={() => {
            props.update_direction(1) }}>
            <div className='review-action'> Rate Trip </div>
          </Link>
          <Link className='passenger-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
          <div className='passenger-view-action'> View Trip </div>
          </Link>
          </>
          }
       
      
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
        <div class='tt_content'> {/* Arrival time */}
          <div >
            <ScheduleOutlined /> {/* icon */}
          </div>
          <div class='tt_input_text'>
            Estimated arrival: {props.trip.arrive_time}
          </div>
        </div>
      </div>

      <div class='tt_info_line'> {/* Start Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Starting at {props.trip.start_location}
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* To Location */}
        <div class='tt_content'>
          <div>
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Finishing at {props.trip.end_location}
          </div>
        </div>

      </div>

      <div class='tt_info_line'> {/* # passengers */}
        <div class='tt_content'>
          <div >
            <GroupOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.passenger_count} <span> passenger(s)</span>
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
      <div class='tt_info_line'> {/*  Intermediate Stops  */}
        <div class='tt_content'>
          <div >
            <PlaceOutlined />
          </div>
          <div class='tt_input_text'>
            Click View Trip to see stops along the way
          </div>
        </div>
      </div>
      <div class='tt_info_line'> {/* Driver  */}
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
          <Link className='driver-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
        <div className='driver-view-action'> View Trip </div>
    </Link>
        </div>
        
        :
        <div className="past-driver-trip-actions">
        <Link className='review-passenger-link driver-trip-actions' to={{ pathname: '/Select/Passenger', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
          <div className='review-passengers'> Review Passengers</div>
        </Link>
        <Link className='past-driver-view-action driver-trip-actions' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
        <div className='past-driver-view-action'> View Trip </div>
    </Link>
    </div>
        }
        
    </motion.div>
  );
}
export { PassengerTripEvent, DriverTripEvent }
