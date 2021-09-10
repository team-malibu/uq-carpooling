import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import BlankDefaultPage from "./components/BlankDefaultPage";
import ButtonDisplayPage from "./components/ButtonDisplayPage";
import TripTile from "./components/TripTile";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
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

function App() {
  const location = useLocation();

  const [[page, direction], setPage] = useState([0, 0]);

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

  return (
    <>
      <h1>page = {page}</h1>
      <h1>direction = {direction}</h1>
      <SimpleNavbar onClick={(newPage) => paginate(newPage)} currentPage={page}/>
      {/* <Navbar onClick={(newPage) => paginate(newPage)} currentPage={page}/> */}
      
      <h1>page = {page}</h1>
      <h1>direction = {direction}</h1>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
        
          <Route path='/' exact component={Book} />

          <Route path='/Account' exact component={Account} />
          <Route path='/Book' exact component={Book} />
          <Route path='/Search' exact component={Search} />
          <Route path='/Calendar' exact component={Timetable} />
            
          <Route path='/test2' exact component={() => <BlankDefaultPage name='test-2' address="Test Address" />} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
        </Switch>
      </AnimatePresence>
      

    </>
  );
}

export default App;
