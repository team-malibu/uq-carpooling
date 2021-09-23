import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BlankDefaultPage from "./components/BlankDefaultPage";
import ButtonDisplayPage from "./components/ButtonDisplayPage";
import TripTile from "./components/TripTile";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import AccountDetails from "./pages/AccountDetails";
import Book from "./pages/Book";
import Calender from "./pages/Calender";
import Search from "./pages/Search";
import SelectDriver from "./pages/SelectDriver";

import ConfirmDriver from "./pages/Confirm";
import Rating from "./pages/Rating";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Timetable from "./pages/Timetable";
import TimeTile from "./components/TimeTile";
import { Example } from "./animations/Example";
import ConfirmJohn from "./pages/confimpages/ConfirmJohn";
import ConfirmAllen from "./pages/confimpages/ConfirmAllen";
import SimpleNavbar from './components/SimpleNavbar';
import BasicPage from './components/BasicPage';


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

    const changeNavbarVisibility = (visibility) => {
      setNavbarVisibility(visibility);
    }

  return (
    <>
      {/* <Navbar onClick={(newPage) => paginate(newPage)} currentPage={page}/> */}
      <AnimatePresence  exitBeforeEnter custom={direction}>
        <Switch location={location} key={location.key}>
          <Route exact path='/' component={() => <SignUp key={location.key} />} />
          {/* <Route path='/' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction}/>} /> */}
          <Route path='/Book' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction}/>} />
          <Route path='/Account' exact component={() => <Account name='Account' hide={true} default={false} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/Search' exact component={() => <Search name='Search' hide={true} default={true} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/Calendar' exact component={() => <Timetable hide={true} default={false} direction={direction} key={location.key} custom={direction}/>} />
          <Route path='/test2' exact component={() => <BlankDefaultPage name='test-2' address="Test Address" />} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
          <Route path='/Rating' exact component={Rating}/>
          <Route path='/AccountDetails' exact component={AccountDetails}/>
          <Route path='/Login' exact component={Login}/>
        </Switch>
      </AnimatePresence>
      <SimpleNavbar location={location} onClick={(newPage) => paginate(newPage)} currentPage={page}/>


    </>
  );
}

export default App;
