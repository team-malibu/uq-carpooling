import React from "react";
import './App.css'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
import Swipe_Mobile_Test from "./animations/Swipe_Mobile_Test";
function App() {
  const location = useLocation();


  return (
    <>

        <Switch location={location} key={location.key}>
          <Route path='/Buttons' exact component={ButtonDisplayPage} />
          <Route path='/TripTile' exact component={() => <TripTile class_name='DECO3801 Build Studio 3' address="Test Address" />} />
          <Route path='/' exact component={SignUp} /> {/* JUST PUTTING BOOK HERE FOR TESTING*/}
          <Route path='/navbar' exact component={Navbar} />
          <Route path='/Account' exact component={Account} />
          <Route path='/Book' exact component={Book} />
          <Route path='/Search' exact component={Search} />
          <Route path='/Calendar' exact component={Timetable} />
          <Route path='/Select' exact component={SelectDriver} />
          <Route path='/Confirm' exact component={ConfirmDriver} />
          <Route path='/SignUp' exact component={SignUp}/>
          <Route path='/Rating' exact component={Rating}/>
          <Route path='/Timetable' exact component={Timetable} />
          <Route path='/test' exact component={Swipe_Mobile_Test} />
          <Route path='/test2' exact component={() => <BlankDefaultPage name='test-2' address="Test Address" />} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
        </Switch>

    </>
  );
}

export default App;
