import React, {useState} from 'react';
import ReactStars from 'react-rating-stars-component';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';
import './StarRating.css';

export default function StarRating () {
    
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    
    return(
        <div className="star-rating">
          
            <ReactStars className="star-rating"
            value={0}
            count={5}
            isHalf={true}
            emptyIcon={RiStarLine}
            halfIcon={RiStarHalfFill}
            filledIcon={RiStarFill}
            onChange = {ratingChanged}
            color = {"#322d95"}
            activeColor={"#322d95"}
            />
             
        </div>
       
    )
};