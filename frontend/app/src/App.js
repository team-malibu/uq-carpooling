import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import SimpleNavbar from './components/SimpleNavbar';
import TimeTile from "./components/TimeTile";
import AccountDetails from "./pages/accountpages/AccountDetails";
import Book from "./pages/bookingpages/Book";
import ConfirmDriver from "./pages/bookingpages/confimpages/Confirm";
import Rating from "./pages/bookingpages/Rating";
import SelectDriver from "./pages/bookingpages/SelectDriver";
import Login from "./pages/Login";
import Timetable from "./pages/timetablepages/Timetable";
import CreateAccount from './pages/CreateAccount';
import Trips from "./pages/trippages/Trips";
import SelectPassenger from './pages/trippages/SelectPassenger';

function App() {
  const location = useLocation();

  const [[page, direction], setPage] = useState([0, 0]);
  const [isNavbarVisible, setNavbarVisibility] = useState(false);
  const [studentId, setStudentId] = useState(null)

    const paginate = (newPage) => {
        if (page < newPage) {
          setPage([newPage, 1]);
          var message = 'counter is at ${page}'
        } else if (page > newPage){
          setPage([newPage, -1]);
        } else {
            setPage([newPage, 0]);
        }
        
        // console.log(isNavbarVisible)

      };

    const update_direction = (newDirection) => {
      setPage([page, newDirection]);
    }

  return (
    <div class="everything-wrapper">
      {/* <Navbar onClick={(newPage) => paginate(newPage)} currentPage={page}/> */}
      <AnimatePresence  exitBeforeEnter custom={direction}>
        <Switch location={location} key={location.key}>
          {/* <Route path='/' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction}/>} /> */}
          <Route path='/Book' exact component={() => <Book name='Book' hide={true}  direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          <Route path='/Account' exact component={() => <AccountDetails name='Account' hide={true} default={false} direction={direction} key={location.key} custom={direction} setStudentId={setStudentId} studentId = {studentId}/>} />
          <Route path='/Trips' exact component={() => <Trips name='Trips' hide={true} default={false} direction={direction} key={location.key} custom={direction}  update_direction={update_direction} studentId = {studentId}/>} />
          <Route path='/Calendar' exact component={() => <Timetable hide={true} default={false} direction={direction} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          <Route path='/Timetile' exact component={() => <TimeTile date = {new Date()} isSelected = {true} />} />
          <Route path='/Select' exact component={() => <SelectDriver direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          <Route path='/Confirm' exact component={() => <ConfirmDriver direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          <Route path='/Rating' exact component={() => <Rating name='Rating' src='https://randomuser.me/api/portraits/men/52.jpg' direction={direction} default={false} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>}/>
          <Route exact path='/' component={() => <Login name='Login' hide={true} default={false} direction={direction} key={location.key} custom={direction} setStudentId={setStudentId} studentId = {studentId}/>} />
          <Route path='/Login' exact component={() => <Login name='Login' hide={false} default={false} direction={direction} key={location.key} custom={direction} update_direction={update_direction} setStudentId={setStudentId} studentId = {studentId}/>}/>
          <Route exact path='/Signup' component={() => <CreateAccount name='Signup' hide={true} default={false} direction={direction} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          <Route exact path='/Select/Passenger' component={() => <SelectPassenger name='Signup' hide={true} default={false} direction={direction} key={location.key} custom={direction} update_direction={update_direction} studentId = {studentId}/>} />
          
        </Switch>
      </AnimatePresence>
      <SimpleNavbar location={location} onClick={(newPage) => paginate(newPage)} currentPage={page}/>


    </div>
  );
}

export default App;
