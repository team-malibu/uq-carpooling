import React, { useState, Component } from 'react';
import StarRating from '../../components/StarRating';
import * as Buttons from '../../components/Button';
import './Rating.css'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import BasicPage from '../../components/BasicPage';

function Rating(props) {

    const [ratingValue, setRatingValue] = useState(3)

    function handleRatingChange(thisValue) {
        setRatingValue(thisValue);
        //console.log(thisValue);
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
                            <div className="reviewSubmitButton" >

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