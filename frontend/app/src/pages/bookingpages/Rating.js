import React, { useState, Component } from 'react';
import StarRating from '../../components/StarRating';
import * as Buttons from '../../components/Button';
import './Rating.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import BasicPage from '../../components/BasicPage';

function Rating(props) {
    const history = useHistory();
    const location = useLocation();
    var trip_id;
    var driver_id;
    var passenger_id;

    if (location.state) {
        trip_id = location.state.trip_id;
        driver_id = location.state.driver_id;
        passenger_id = location.state.passenger_id;
    }

    const [ratingValue, setRatingValue] = useState(3)

    function handleRatingChange(thisValue) {
        setRatingValue(thisValue);
        //console.log(thisValue);
    }

    function handleSubmission(event) {
        event.preventDefault();
        
        // add a new passenger trip to store the new rating
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'trip_id': trip_id,
                'passenger_id': passenger_id,
                'rating': ratingValue,
                'comments': "None"
            })
        };
        fetch("https://deco3801-teammalibu.uqcloud.net/db/trips/add-passenger-trip", requestOptions1)
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
        fetch("https://deco3801-teammalibu.uqcloud.net/db/ratings/driver/getall", requestOptions2)
        .then(result => result.json())
        .then(data => {
            let sum = 0;
            let num = 0;
            for (const rating of Object.values(data)) {
                sum += rating.rating;
                num++;
            }
            const average = sum / num;

            // update the driver's average rating
            const requestOptions3 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'average_rating': average,
                    'student_id': driver_id
                })
            };
            fetch("https://deco3801-teammalibu.uqcloud.net/db/users/update-rating", requestOptions3)
            .catch((e) => {
                console.warn(e)
            });
        }).catch((e) => {
            console.warn(e)
        });
        
        history.push('/Trips');

    }


    function createRating() {
        return (
            <>
                {/* <BlankDefaultPage currentlySelected={0} name='Rating' previousPage='/Book' hide={true}/> */}
                <div className="rating-page">
                    <Avatar variant='circle' className='rating-driver-avatar' style={{ height: '225px', width: '225px' }} src={props.src} />
                    {/* <div className="rating-wrapper"> */}

                        <h2 className="header">Leave a rating</h2>

                        <h3 className="driver">Your Driver: {props.name} </h3>
                        
                        <div className="review-stars">
                            <StarRating
                            value = {ratingValue}
                            onChange = {handleRatingChange} />
                        </div>
                        <Link to='/Book'>
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

        <BasicPage name={"Leave a rating"} body={createRating()} currentlySelected={0} previousPage='/Confirm' direction={props.direction} default={props.default} key={props.key} custom={props.custom} update_direction={props.update_direction} />

    )

}

export default Rating