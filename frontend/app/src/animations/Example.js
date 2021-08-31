import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut, wrap } from "popmotion";
import './Example.css'
import transitions from "@material-ui/core/styles/transitions";

const variants = {
  enter: (direction) => {
    return {
      x: '100vw',
      opacity: 1,
      transition: { type: 'tween' }
    };
  },
  centerText: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 1,
      x: '-100vw',
      transition: { type: 'tween' }
    };
  }
};
const nextVarients = {
    rightArrow: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    enter: (direction) => {
        return {
            x: '100vw',
            opacity: 1,
            };
        },
        centerText: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
        return {
            zIndex: 1,
            x: '-100vw',
            transition: { type: 'tween' }
        };
        }
    };

const NavArrow = () => {
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 25 25" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <path id="Path_27" data-name="Path 27" d="M29,14.937H9.984L18.719,6.2,16.5,4,4,16.5,16.5,29l2.2-2.2L9.984,18.062H29Z" transform="translate(-4 -4)" fill="#462963" />
        </svg>
    )
}


const PicFramer = () => {
    const images = [
        "Book",
        "Select",
        "Confirm"
      ];

    const pages = [
        {
            name: 'Book',
            previous: null,
            next: '/Select'
        },
        {
            name: 'Select',
            previous: '/Book',
            next: '/Confirm'
        },
        {
            name: 'Confirm',
            previous: '/Select',
            next: null
        }
    ]
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);
    const pageIndex = wrap(0, pages.length, page);

    const paginate = (newDirection) => {
        /** newPosition = page + newDirection
        if page. */
        setPage([page + newDirection, newDirection]);
    };
    const paginatePage = (newDirection) => {
        /** newPosition = page + newDirection
        if page. */
        setPage([page + newDirection, newDirection]);
    };

    return (
    <>
      <AnimatePresence initial={true} custom={direction}>
        <motion.div className='top-container'
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="centerText"
            exit="exit"
            transition= {{ type:'tween', duration: 3}}
            >
            <h1>{ pages[pageIndex].name }</h1>
            <div className='right-arrow' onClick={() => paginate(-1)}><NavArrow ></NavArrow></div>
            <div className='left-arrow' onClick={() => paginate(1)}><NavArrow ></NavArrow></div>

        </motion.div>

    </AnimatePresence>
    

            {/* <div className="prev" onClick={() => paginate(-1)}>
                <NavArrow className='right-arrow'></NavArrow>
            </div>             */}
      
    </>
  );
};

export const Example = () => (
    <div className="example-container">
      <PicFramer />
    </div>
  );