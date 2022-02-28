import React, { useState, useEffect } from 'react';
 
import './App.css';
import Todo from './components/todo';
import { useDispatch, useSelector } from "react-redux";
import Drawer from './components/managementMenu';
import Login from "./components/Login";
import Profile from './components/Profile';
import { history } from "./helpers/history";
import {CreateLayout as Sto} from './components/Sto';
import { clearMessage } from "./actions/message";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Event from './components/Event';

import EventPage from './components/EventPage';
import Skladiste from './components/Skladiste'
import StaffDrawer from './components/staffMenu';
import Sank from './components/Sank';
import StaffEvent from './components/StaffEvent';
import ProdajKartu from './components/ProdajKartu';
import Rezervacija from './components/Reservacija';


function App() {

  const [showManagementBoard, setShowManagementBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);


  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.roles) {
      setShowManagementBoard(currentUser.roles.includes("ROLE_MANAGEMENT"));
      
    }
  }, [currentUser]);

  return (
    <Router history={history}>
     {currentUser ? (showManagementBoard ? <Drawer /> : <StaffDrawer />) : <></>}
   
        <Switch>
          <Route path="/" element={<Login history={history}/>} /> 
          <Route path="/todo" element={<Todo/>} /> 
          <Route exact path="/login" element={<Login history={history}/>} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/sto" element={<Sto />} />
          <Route exact path="/event" element={<Event />} />
          <Route exact path="/eventpage" element={<EventPage />} />
          <Route exact path="/staffevent" element={<StaffEvent />} />
          <Route exact path="/prodajkartu" element={<ProdajKartu />} />
          <Route exact path="/skladiste" element={<Skladiste />} />
          <Route exact path="/sank" element={<Sank />} />
          <Route exact path="/rezervacija" element={<Rezervacija />} />
        </Switch>
    
  </Router>
);
  
}

export default App;
