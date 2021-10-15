import React from 'react'
import './BasicPage.css'
import { motion } from 'framer-motion';
import { BrowserRouter as Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import PopUp from '../components/PopUp';

const variants = {
  enter: (direction) => {
    return {
      x: direction < 0 ? -500 : 500,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
    };
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
              <rect id="Backgorund_bn" rx="0" ry="0" x="0" y="0" width="100%" height="100%">
              </rect>
          </svg>
          <svg class="Rectangle_314">
              <rect id="Rectangle_314" rx="0" ry="0" x="0" y="0" width="100%" height="100%">
              </rect>
          </svg>
      </div>
  );
}

function TopSection(props) {
  const history = useHistory();
  return (
      <>
      
      <div className='top'>
          {!props.hide && 
          <div className='back-arrow' onClick={() => {
            props.update_direction(-1)
            history.push(props.previousPage)
            console.log('back arrow pushed')
            console.log('Current direction:' + props.direction)
            }}>
            <Link to={props.previousPage} className='back-arrow' >
                <svg xmlns="http://www.w3.org/2000/svg" className='back-arrow' width="25" height="25" viewBox="0 0 25 25">
                    <path id="Path_27" data-name="Path 27" d="M29,14.937H9.984L18.719,6.2,16.5,4,4,16.5,16.5,29l2.2-2.2L9.984,18.062H29Z" transform="translate(-4 -4)" fill="#462963" />
                </svg>
            </Link>
          </div>
          }
          <h1 className='page-title'>{props.name}</h1>
      </div>
    </>
  );
}


function BasicPage(props) {
  return (
    <>
      <BackgroundContainer />
      <motion.div className='page-wrapper'
        key={props.key}
        custom={props.direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
        x: { type: "spring", stiffness: 300, damping: 20 }
        }, { duration: 0.2 }}>
                    
          <TopSection name={props.name} previousPage={props.previousPage} hide={props.hide} direction={props.direction} currentlySelected={props.currentlySelected} update_direction={props.update_direction}/>
          {props.default && 
            <div className='body' id={props.className} />
          }
          {!props.default &&
            <div className='body'>
            {props.body}
            </div>
            }
          {props.showPopUp ? <PopUp toggle={props.togglePopUp} message={props.popUpMessage} /> : null}
          
        </motion.div>
    </>
)
}

export default BasicPage
