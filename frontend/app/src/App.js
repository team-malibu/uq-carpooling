import React from "react";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
import Timetable from "./pages/Timetable";
import TimeTile from "./components/TimeTile";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/Buttons' exact component={ButtonDisplayPage} />
          <Route path='/TripTile' exact component={() => <TripTile class_name='DECO3801 Build Studio 3' address="Test Address" />} />
          <Route path='/' exact component={Book} /> {/* JUST PUTTING BOOK HERE FOR TESTING*/}
          <Route path='/navbar' exact component={Navbar} />
          <Route path='/Account' exact component={Account} />
          <Route path='/Book' exact component={Book} />
          <Route path='/Search' exact component={ButtonDisplayPage} />
          <Route path='/Calendar' exact component={Calender} />
          <Route path='/Select' exact component={SelectDriver} />
          <Route path='/Confirm' exact component={ConfirmDriver} />
          <Route path='/Timetable' exact component={Timetable} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
