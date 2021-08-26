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

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/test' exact component={BlankDefaultPage} />
          <Route path='/Buttons' exact component={ButtonDisplayPage} />
          <Route path='/TripTile' exact component={() => <TripTile class_name='DECO3801 Build Studio 3' address="Test Address" />} />
          <Route path='/' exact component={BlankDefaultPage} />
          <Route path='/navbar' exact component={Navbar} />
          <Route path='/Account' exact component={Account} />
          <Route path='/Book' exact component={Book} />
          <Route path='/Search' exact component={Search} />
          <Route path='/Calendar' exact component={Calender} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
