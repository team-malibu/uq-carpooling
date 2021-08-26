import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlankDefaultPage from "./components/BlankDefaultPage";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Book from "./pages/Book";
import Calender from "./pages/Calender";
import PageTest from "./pages/PageTest";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Router>
        <Switch>
        <Route path='/' exact component={BlankDefaultPage} />
        <Route path='/navbar' exact component={Navbar} />
        <Route path='/test' exact component={PageTest} />
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
