import React, { useState, Component } from 'react';
import StarRating from '../components/StarRating';
import * as Buttons from '../components/Button';
import './Rating.css'
import BlankDefaultPage from '../components/BlankDefaultPage';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
function Rating(props) {

    function createRating() {
        return (
            <>
                {/* <BlankDefaultPage currentlySelected={0} name='Rating' previousPage='/Book' hide={true}/> */}
                <div className="page">
                    <Avatar variant='circle' className='rating-driver-avatar' style={{ height: '225px', width: '225px' }} src={props.src} />
                    <div className="rating-wrapper">

                        <h2 className="header">Leave a rating</h2>

                        <h3 className="driver">Your Driver: {props.name} </h3>
                        
                        <div className="review-stars">
                            <StarRating />
                        </div>
                        <Link to='/Book'>
                            <div className="reviewSubmitButton" >

                                <Buttons.MediumConfirmButton name="Submit" />

                            </div>
                        </Link>
                    </div>
                </div>
            </>
        )

    }

    return (

        <BlankDefaultPage name={"Leave a rating"} body={createRating()} currentlySelected={0} previousPage='/Confirm' />

    )

}

export default Rating