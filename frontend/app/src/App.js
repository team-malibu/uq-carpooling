import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlankDefaultPage from "./components/BlankDefaultPage";
import ButtonDisplayPage from "./components/ButtonDisplayPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
        <Route path='/' exact component={BlankDefaultPage} />
        <Route path='/Buttons' exact component={ButtonDisplayPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
