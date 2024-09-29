import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventScreen from './Screens/EventScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { TabbedAccordianContainer } from './components/tabbedContainer';
import LoginPage from "./Screens/Login"

import PrivateRoute from './utilities/privateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage/>} />

        {/* Private Route */}
        <Route element={<PrivateRoute redirectTo="/login" />}>
          <Route path="/" element={ <EventScreen title="Abhishek Events" />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App
