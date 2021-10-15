import React, { useState } from 'react';
import BasicPage from '../components/BasicPage'
import './Search.css'
import { Link } from "react-router-dom";

import { AnimateSharedLayout, motion, AnimatePresence } from "framer-motion"

// const items = [
//     {
//       title: "Event 1",
//       description: 'description 1',
//       id: 1
//     },
//     {
//         title: "Event 2",
//         description: 'description 2',
//         id: 2
//     },
//     {
//         title: "Event 3",
//         description: 'description 3',
//         id: 3
//     },
//     {
//         title:"Event 4",
//         description: 'description 4',
//         id: 4
//     }
//   ]
  const items = [
    // Photo by ivan Torres on Unsplash
    {
      id: "c",
      category: "Event",
      title: "Event 1",
      pointOfInterest: 80,
      backgroundColor: "#814A0E",
      format: "normal",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    // Photo by Dennis Brendel on Unsplash
    {
      id: "f",
      category: "Event",
      title: "Event 2",
      pointOfInterest: 120,
      backgroundColor: "#959684",
      format: "normal",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    // Photo by Alessandra Caretto on Unsplash
    {
      id: "a",
      category: "Event",
      title: "Event 3",
      pointOfInterest: 260,
      backgroundColor: "#5DBCD2",
      format: "normal",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    // Photo by Taneli Lahtinen on Unsplash
    {
      id: "g",
      category: "Club",
      title: "Club 1",
      pointOfInterest: 200,
      backgroundColor: "#8F986D",
      format: "normal",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    // Photo by Simone Hutsch on Unsplash
    {
      id: "d",
      category: "Club",
      title: "Club 2",
      pointOfInterest: 150,
      backgroundColor: "#FA6779",
      format: "normal",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
    id: "y",
        category: "Club",
        title: "Club 3",
        pointOfInterest: 150,
        backgroundColor: "#FA6779",
        format: "normal",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: "b",
        category: "Club",
        title: "Club 4",
        pointOfInterest: 150,
        backgroundColor: "#FA6779",
        format: "normal",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ]

function Card({ id, title, category, description, format }) {
    return (
      <div className={`card-${format}`}>
        <div className="card-content-container">
          <motion.div className="card-content" layoutId={`card-container-${id}`}>
            <motion.div
              className="card-image-container"
              layoutId={`card-image-container-${id}`}
            >
              <img className="card-image" src={`images/${id}.jpg`} alt="" />
            </motion.div>
            <motion.div
              className="title-container"
              layoutId={`title-container-${id}`}
            >
              <span className="category">{category}</span>
              <h2>{title}</h2>
            </motion.div>
          </motion.div>
        </div>
        <div className='description'>
            {description}
        </div>
        {/* <Link to={id} className={`card-open-link`} /> */}
      </div>
    );
  }

function List({ selectedId }) {
    return (
        <div className='card_wrapper'>
            <ul className="card-items">
            {items.map(card => (
                <Card key={card.id} {...card} isSelected={card.id === selectedId} />
            ))}
            </ul>
        </div>
    );
}

function Search(props) {
    const [selectedId, setSelectedId] = useState(null)

    function SearchBody(props) {
        //const items = [0, 1, 2];
        return (
            <List>selectedId={selectedId}</List>
        )
    }
        
        
        
    
    
    return (
        // <BlankDefaultPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={CreateBody}/>
        <BasicPage currentlySelected={2} name='Search' hide={true} direction={props.direction} body={SearchBody(props)} default={props.default} key={props.key} custom={props.custom} />
    )
}

export default Search
