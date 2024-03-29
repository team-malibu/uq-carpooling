import React, { useState } from 'react';
import StarRating from '../../components/StarRating';
import * as Buttons from '../../components/Button';
import './Rating.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import BasicPage from '../../components/BasicPage';

/**
 * The Rating page allows the user to give a star rating of their driver
 * on a scale of 1 to 5. Upon submission, the current score of the driver is
 * fetched and a new average rating is calculated. 
 */
function Rating(props) {

  const history = useHistory();
  const location = useLocation();
  var trip;
  var driver_id;
  var passenger_id;
  if (location.trip) {
    trip = location.trip;
    driver_id = trip.driver_id
    passenger_id = props.student_id;
  }

  const [driverData, setDriverData] = useState({ data: null, foundFlag: false })
  if (!driverData.foundFlag) {
    const requestPicture = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'student_id': driver_id
      })
    };

    fetch("https://deco3801-teammalibu.uqcloud.net/db/users/user-picture", requestPicture)
      .then(result => result.json())
      .then(data => {
        setDriverData({
          data: data,
          foundFlag: true,
        })
      });

  }
  const [ratingValue, setRatingValue] = useState(3)

  /**
    * Receives value from child function and updates
    * the state in the relevant hook
    */
  function handleRatingChange(thisValue) {
    setRatingValue(thisValue);
  }

  /**
    * Sends updated rating of driver to the backend
    */
  async function handleSubmission(event) {
    event.preventDefault();
    // add a new passenger trip to store the new rating (IS THIS NEEDED? Dont we just update the current entry in `cp-passenger-trip`?- Conal)
    const requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'trip_id': trip.trip_id,
        'passenger_provided_rating': ratingValue,
      })
    };
    await fetch("https://deco3801-teammalibu.uqcloud.net/db/ratings/trip/set-rating", requestOptions1)
      .catch((e) => {
        console.warn(e)
      });

    // get all ratings of the current driver
    const requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'driver_id': driver_id
      })
    };

    var average;
    await fetch("https://deco3801-teammalibu.uqcloud.net/db/ratings/driver/getall", requestOptions2)
      .then(result => result.json())
      .then(data => {
        let sum = 0;
        let num = 0;
        for (const rating of Object.values(data)) {
            if (rating.passenger_provided_rating == null) {
                continue;
            }
          sum += rating.passenger_provided_rating;
          num++;
        }
        if (sum == 0) {
          average = 5
        } else {
          average = sum / num;
        }
       
        // update the driver's average rating

      }).catch((e) => {
        console.warn(e)
      });
  
    const requestOptions3 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'average_rating': average,
        'student_id': driver_id
      })
    };
    await fetch("https://deco3801-teammalibu.uqcloud.net/db/users/update-rating", requestOptions3)
      .catch((e) => {
        console.warn(e)
      });

    history.push('/Trips');

  }

  /**
    * Displays the driver details and the star rating component 
    */
  function createRating(props) {
    var img = null;
    if (driverData.foundFlag) {
      const { data } = driverData.data.user_avatar;
      img = new Buffer.from(data).toString("ascii");
    }
    return (
      <>
        {/* <BlankDefaultPage currentlySelected={0} name='Rating' previousPage='/Book' hide={true}/> */}
        <div className="rating-page">
          <Avatar variant='circular' className='rating-driver-avatar' style={{ height: '225px', width: '225px' }} src={img} />
          {/* <div className="rating-wrapper"> */}

          <h2 className="header">Leave a rating</h2>

          <h3 className="driver">Your Driver: {trip.driver_first_name} {trip.driver_last_name}</h3>

          <div className="review-stars">
            <StarRating
              value={ratingValue}
              onChange={handleRatingChange} />
          </div>
          <Link to='/Trips'>
            <div className="reviewSubmitButton" onClick={handleSubmission}>

              <Buttons.MediumConfirmButton name="Submit" />

            </div>
          </Link>
          {/* </div> */}
        </div>
      </>
    )

  }

  return (

    <BasicPage name={"Leave a rating"} body={createRating()} currentlySelected={0} previousPage='/Trips' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction} />

  )

}

export default Rating