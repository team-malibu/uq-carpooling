import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BlankDefaultPage from "./components/BlankDefaultPage";
function App() {
  return (
    <>
      <Router>
        <Switch>
        <Route path='/' exact component={BlankDefaultPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
