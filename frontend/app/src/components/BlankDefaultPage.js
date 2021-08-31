import React, { useState } from 'react'
import './BlankDefaultPage.css'
import Navbar from './Navbar.js'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from "uuid";
import { wrap } from "popmotion";

const headerVariants = {
    hidden: {
        opacity: 0,
        x: '100wh'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            delay: 0.5,
            stiffness: 80
        }
    },
    right: {
        x: '100vw',
        transition: {
            type: 'spring',
            delay: 0.5,
            stiffness: 80
        }
    },
    left: {
        x: '-100vw',
        transition: {
            type: 'spring',
            delay: 0.5,
            stiffness: 80
        }
    }

}

function BackgroundContainer() {
    return (
        <div className='Background'>
            <svg class="Backgorund_bn">
                <linearGradient id="Backgorund_bn" spreadMethod="pad" x1="1.309" x2="-0.034" y1="-0.434" y2="1.038">
                    <stop offset="0" stop-color="#8000ff" stop-opacity="1"></stop>
                    <stop offset="0.6054" stop-color="#37a7f2" stop-opacity="1"></stop>
                    <stop offset="1" stop-color="#4ce2e2" stop-opacity="1"></stop>
                </linearGradient>
                <rect id="Backgorund_bn" rx="0" ry="0" x="0" y="0" width="375" height="812">
                </rect>
            </svg>
            <svg class="Rectangle_314">
                <rect id="Rectangle_314" rx="0" ry="0" x="0" y="0" width="375" height="741">
                </rect>
            </svg>
        </div>
    );
}

function TopSection(props) {
    const variants = {
        exit: (direction: number) => {
          return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1
        },
        enter: (direction: number) => {
          return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
          };
        }
      };
     const images = [
        "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
      ];
    
    const pages = [
        <BlankDefaultPage currentlySelected={3} name='Book' previousPage='/Account'/>,
        <BlankDefaultPage currentlySelected={3} name='Timetable' previousPage='/Book'/>,
        <BlankDefaultPage currentlySelected={3} name='Explore' previousPage='/Timetable'/>,
        <BlankDefaultPage currentlySelected={3} name='Account' previousPage='/Explore'/>
    ]
    const [[page, direction], setPage] = useState([0, 0])
    const pageIndex = wrap(0, pages.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <>
        
        <AnimatePresence initial={true} custom={headerVariants}> 
        <motion.div className='top' key={uuidv4}
            key={page}
            src={page[pageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
        >
            <Link to={props.previousPage} className='back-arrow' variants={headerVariants} >
                <motion.svg xmlns="http://www.w3.org/2000/svg" className='back-arrow' width="25" height="25" viewBox="0 0 25 25" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    <path id="Path_27" data-name="Path 27" d="M29,14.937H9.984L18.719,6.2,16.5,4,4,16.5,16.5,29l2.2-2.2L9.984,18.062H29Z" transform="translate(-4 -4)" fill="#462963"
                        variants={headerVariants} exit='hidden' />
                </motion.svg>
            </Link>

            <h1 className='page-title'>{props.name}</h1>
        </motion.div>
        </AnimatePresence>
        <div className="next" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
      <div className="prev" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      </>
    );
}

function BlankDefaultPage(props) {
    return (
        <>
            <BackgroundContainer />
            <TopSection name={props.name} previousPage={props.previousPage} />
            <div className='body'>
              {props.body}
            </div>
            <div className='bottom'>
                <Navbar currentlySelected={props.currentlySelected} />
            </div>
        </>
    )
}

export default BlankDefaultPage
