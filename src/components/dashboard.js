/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    await axios.get('http://localhost:8000/api/user')
      .then((response) => {
        setUser(response.data);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchData();
    }
  }, []); // Empty dependency array to run the effect only once

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    await axios.post('http://localhost:8000/api/logout')
      .then(() => {
        localStorage.removeItem("token");
        navigate('/');
      });
  };

  return (
    <>
      {/* Add the Navbar component here */}
      <Navbar />

      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body">
                SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                <hr />
                <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
