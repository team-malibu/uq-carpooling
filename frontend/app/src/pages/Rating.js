import React from 'react';
import StarRating from '../components/StarRating';
import PlainBackground from '../components/PlainBackground';
import * as Buttons from '../components/Button';
import './Rating.css'

function Rating() {
    return (
        <div className="page">
            <div className="rating_background">
                <PlainBackground />
            </div>
            <div className="wrapper">

                <h2 className="header">Leave a rating</h2>

                <h3 className="driver">Your Driver: </h3>

                <div className="rating_stars">
                    <StarRating />
                </div>

                <div className="submitButton">

                    <Buttons.MediumConfirmButton name="Submit" />
                </div>

                <div className="LaterButton">

                    <Buttons.MediumConfirmButton name="Maybe Later" />
                </div>
            </div>
        </div>
    )
}

export default Rating