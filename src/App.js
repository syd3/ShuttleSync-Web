import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import User from './pages/user/User';
import Schedule from './pages/schedule/Schedule';
import Review from './pages/review/Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;