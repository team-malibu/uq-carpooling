import React from 'react';
import StarRating from '../components/StarRating';
import PlainBackground from '../components/PlainBackground';
import * as Buttons from '../components/Button';
import './Rating.css'
import BlankDefaultPage from '../components/BlankDefaultPage';
import { Link } from 'react-router-dom'
function Rating() {
    return (
        <div>
            <BlankDefaultPage currentlySelected={0} name='Rating' previousPage='/Book' hide={true}/>
        <div className="page">
            <h1 className="ReviewdriverAvatar"> {"<DriverAvatar>"} </h1>
            <div className="wrapper">

                <h2 className="header">Leave a rating</h2>

                <h3 className="driver">Your Driver: </h3>
                <h3 className="driver"> {"<DriverName>"} </h3>
                <div className="rating_stars">
                    <StarRating />
                </div>
                <Link to='/Book'>
                    <div className="reviewSubmitButton" >

                            <Buttons.MediumConfirmButton name="Submit" />
                        
                    </div>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default Rating