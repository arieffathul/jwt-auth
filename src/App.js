/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/Register';
import './index.css';
// Import rider-related components
import RiderIndex from './riders/index';
import RiderCreate from './riders/create';
import RiderEdit from './riders/edit';
import RiderCard from './riders/card';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuth(true); // Set authentication if token is in localStorage
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} /> {/* Add Register Route */}
        {/* Rider-related routes */}
        <Route path="/riders" element={<RiderIndex />} />
        <Route path="/riders/create" element={<RiderCreate />} />
        <Route path="/riders/edit/:id" element={<RiderEdit />} />
        <Route path="/riders/card" element={<RiderCard />} />
      </Routes>
    </Router>
  );
}

export default App;
