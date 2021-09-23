import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BlankDefaultPage from "./components/BlankDefaultPage";
import ButtonDisplayPage from "./components/ButtonDisplayPage";
import TripTile from "./components/TripTile";
import Navbar from "./components/Navbar";
import Account from "./pages/accountpages/Account";
import Book from "./pages/bookingpages/Book";
import Search from "./pages/Search";
import SelectDriver from "./pages/bookingpages/SelectDriver";

import ConfirmDriver from "./pages/bookingpages/confimpages/Confirm";
import Rating from "./pages/bookingpages/Rating";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Timetable from "./pages/timetablepages/Timetable";
import TimeTile from "./components/TimeTile";
import { Example } from "./animations/Example";
import ConfirmJohn from "./pages/bookingpages/confimpages/ConfirmJohn";
import ConfirmAllen from "./pages/bookingpages/confimpages/ConfirmAllen";
import SimpleNavbar from './components/SimpleNavbar';


function App() {
  const location = useLocation();

  const [[page, direction], setPage] = useState([0, 0]);
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

    const paginate = (newPage) => {
        if (page < newPage) {
          setPage([newPage, 1]);
          var message = 'counter is at ${page}'
        } else if (page > newPage){
          setPage([newPage, -1]);
        } else {
            setPage([newPage, 0]);
        }
      };

    const update_direction = (newDirection) => {
      setPage([page, newDirection]);
    }

    const changeNavbarVisibility = (visibility) => {
      setNavbarVisibility(visibility);
    }

  return (
    <>
      {/* <Navbar onClick={(newPage) => paginate(newPage)} currentPage={page}/> */}
      <AnimatePresence  exitBeforeEnter custom={direction}>
        <Switch location={location} key={location.key}>
          {/* <Route path='/' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction}/>} /> */}
          <Route path='/Book' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>} />
          <Route path='/Account' exact component={() => <Account name='Account' hide={true} default={false} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/Search' exact component={() => <Search name='Search' hide={true} default={true} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/Calendar' exact component={() => <Timetable hide={true} default={false} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/test2' exact component={() => <BlankDefaultPage name='test-2' address="Test Address" />} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
          <Route exact path='/' component={() => <SignUp key={location.key} />} />
          <Route path='/Select' exact component={() => <SelectDriver direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>} />
          <Route path='/Confirm' exact component={() => <ConfirmDriver direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>} />
          <Route path='/confirm/allen' exact component={() => <ConfirmAllen direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>} />
          <Route path='/confirm/john' exact component={() => <ConfirmJohn direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>} />
          <Route path='/Rating' exact component={() => <Rating name='Allen Walters' src='https://randomuser.me/api/portraits/men/52.jpg' direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction}/>}/>

        </Switch>
      </AnimatePresence>
      <SimpleNavbar location={location} onClick={(newPage) => paginate(newPage)} currentPage={page}/>


    </>
  );
}

export default App;
