import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlankDefaultPage from "./components/BlankDefaultPage";
import ButtonDisplayPage from "./components/ButtonDisplayPage";
import TripTile from "./components/TripTile";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/test' exact component={BlankDefaultPage} />
          <Route path='/Buttons' exact component={ButtonDisplayPage} />
          <Route path='/TripTile' exact component={() => <TripTile class_name='DECO3801 Build Studio 3' address="Test Address" />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
