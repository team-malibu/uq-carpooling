import React, { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { motion } from "framer-motion"
import './StarRating.css';


/**
 * The StarRating component is displayed on the Rating Page and allows 
 * a user to select up to five stars on the screen. The chosen reating is 
 * stored within a hook and updated whenever the user selects a different rating.
 * The accompanying rating text changes depending on the rating selected.
 */

export default function StarRating(props) {

    const [rating, setRating] = useState(3);

    /**
    * Passes value back up to parent function updating 
    * the state in Rating page
    */
    function handleRatingChange(e) {
        setRating(e.target.value)
        props.onChange(e.target.value);
    }

    return (
        <div className="star-rating">
            <div className= "star-items-wrapper">
            <div className="stars-aligned">
                {rating >= 1
                    ? <motion.div className="star-appears"
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarFill /> </motion.div>
                    : <motion.div className="star-leaves"
                        animate={{ scale: 0.75 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarLine /> </motion.div>}

                {rating >= 2
                    ? <motion.div className="star-appears"
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.75 }}> <RiStarFill /> </motion.div>
                    : <motion.div className="star-leaves"
                        animate={{ scale: 0.75 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarLine /> </motion.div>}

                {rating >= 3
                    ? <motion.div className="star-appears"
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarFill /> </motion.div>
                    : <motion.div className="star-leaves"
                        animate={{ scale: 0.75 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarLine /> </motion.div>}

                {rating >= 4
                    ? <motion.div className="star-appears"
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.75 }} >
                        <RiStarFill /> </motion.div>
                    : <motion.div className="star-leaves"
                        animate={{ scale: 0.75 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarLine /> </motion.div>}
                {/* Leave this */}
                {rating >= 5
                    ? <motion.div className="star-appears"
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarFill /> </motion.div>
                    : <motion.div className="star-leaves"
                        animate={{ scale: 0.75 }}
                        transition={{ duration: 0.75 }}>
                        <RiStarLine /> </motion.div>}

            </div>
            <input className="rating-selector"
                type="range"
                min="1"
                max="5"
                step="1"
                value={rating}
                onChange={handleRatingChange}
                >
            </input>
            </div>
           

            <motion.div className="rating-text">
                {rating == 1 && <motion.div className="rating-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    Poor </motion.div>}
                {rating == 2 && <motion.div className="rating-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    Fair </motion.div>}
                {rating == 3 && <motion.div className="rating-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    Good </motion.div>}
                {rating == 4 && <motion.div className="rating-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    Very Good </motion.div>}
                {rating == 5 && <motion.div className="rating-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>
                    Excellent </motion.div>}

            </motion.div>

        </div>
        
    )
};