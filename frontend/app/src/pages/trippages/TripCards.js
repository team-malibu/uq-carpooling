import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SchoolOutlined, PlaceOutlined, ScheduleOutlined, GroupOutlined, DriveEtaOutlined, PersonPinOutlined } from '@material-ui/icons/'
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
      <AnimatePresence>{isOpen && <PassengerFooter setPassengerDataFound={props.setPassengerDataFound} setRequestDataFound={props.setRequestDataFound} studentId={props.studentId} history={history} trip={props.trip} pending={props.pending} isUpcoming={props.isUpcoming} update_direction={props.update_direction} />}</AnimatePresence>
    </motion.div>
  );
}

async function passengerDelete(props) {

  const postOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'trip_id': props.trip.trip_id,
      'passenger_id': props.studentId,
    })
  };

  await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/delete-trip-as-passenger", postOptions)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    });


  props.setRequestDataFound({ data: null, foundFlag: false, processedFlag: false, requestTrips: [] })


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
            {props.pending ? "Pickup PENDING" : "Pick up location: " + props.trip.passenger_location}
          </div>
        </div>
      </div>
      <div class='tt_info_line'> {/*  Driver Name   */}
        <div class='tt_content'>
          <div >
            <PersonPinOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.driver_first_name} {props.trip.driver_last_name}
          </div>
        </div>
      </div>
      {props.pending ? null : 
        <div class='tt_info_line'> {/*  Driver Name   */}
        <div class='tt_content'>
          <div >
            <DriveEtaOutlined />
          </div>
          <div class='tt_input_text'>
            {props.trip.car_type} {props.trip.number_plate}
          </div>
        </div>
      </div>
      }
      <div className="passenger-trip-actions">
        {props.isUpcoming ?
          <>
            <Link className='passenger-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
              <div className='passenger-view-action'> View Trip </div>
            </Link>
            {props.pending ? <div className='cancel-action' onClick={() => passengerDelete(props)}> Cancel </div> : null}
          </>
          :
          <>
            <Link className='review-action' to={{ pathname: '/Rating', trip: props.trip }} onClick={() => {
              props.update_direction(1)
            }}>
              <div className='review-action'> Rate Trip </div>
            </Link>
            <Link className='upcoming-passenger-view-action' to={{ pathname: '/TripVisualiser', trip: props.trip }} onClick={() => { props.update_direction(1) }}>
              <div className='upcoming-passenger-view-action'> View Trip </div>
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
      <AnimatePresence>{isOpen && <DriverFooter setDriverDataFound={props.setDriverDataFound} trip={props.trip} isUpcoming={props.isUpcoming} update_direction={props.update_direction} />}</AnimatePresence>
    </motion.div>
  );
}

async function driverDelete(props) {

  const postOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'trip_id': props.trip.trip_id
    })
  };

  await fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/delete-trip-as-driver", postOptions)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    });

  props.setDriverDataFound({ data: null, foundFlag: false, processedFlag: false, driverPastTrips: [], driverUpcomingTrips: [] })

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
            <PersonPinOutlined />
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
          <div className='driver-cancel-action' onClick={() => driverDelete(props)}> Cancel Trip </div>
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
