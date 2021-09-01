import React from 'react';
import StarRating from '../components/StarRating';
import PlainBackground from '../components/PlainBackground';
import * as Buttons from '../components/Button';
import './Rating.css'
import BlankDefaultPage from '../components/BlankDefaultPage';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
function Rating(props) {
    return (
        <div>
            <BlankDefaultPage currentlySelected={0} name='Rating' previousPage='/Book' hide={true}/>
        <div className="page">
        <Avatar variant='circle' className='driver-avatar' style={{ height: '100px', width: '100px'}} src={props.src} />
            <div className="wrapper">

                <h2 className="header">Leave a rating</h2>

                <h3 className="driver">Your Driver: </h3>
                <h3 className="driver"> {props.name} </h3>
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