/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from '../api'; // Adjust relative path after moving api

//import Link
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function RiderCard() {
    //ini state
    const [riders, setRiders] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate(); // Hook for navigation
    const token = localStorage.getItem("token");


    //define method
    const fetchDataRiders = async () => {
        //fetch data from API with Axios
        await api.get("/api/riders").then((response) => {
            //assign response data to state "riders"
            setRiders(response.data.data.data);
        });
    };

    //run hook useEffect
    // Method to fetch user data
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.get('http://localhost:8000/api/user')
            .then((response) => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };

    // Run hook to check token and fetch data when component mounts
    useEffect(() => {
        if (!token) {
            navigate('/'); // Redirect to login if token is not found
        } else {
            fetchDataRiders(); // Fetch riders if token is present
            fetchData(); // Fetch user data
        }
    }, [token, navigate]); // Dependency on token and navigate

    //method deleteRider
    const deleteRider = async (id) => {
        //delete with api
        await api.delete(`/api/riders/${id}`).then(() => {
            //call method "fetchDataRiders"
            fetchDataRiders();
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <Link
                            to="/riders/create"
                            className="btn btn-md btn-success rounded shadow border-0 mb-3"
                        >
                            ADD NEW RIDER DATA
                        </Link>
                        <div className="row">
                            {riders.length > 0 ? (
                                riders.map((rider, index) => (
                                    <div className="col-md-4 mb-4" key={index}>
                                        <div className="card border-0 rounded shadow" style={{ height: "450px" }}>
                                            <div
                                                className="card-body d-flex flex-column justify-content-center align-items-center text-center"
                                                style={{ height: "100%" }}
                                            >
                                                <h4 className="card-title fw-bold">{rider.name}</h4>
                                                <img
                                                    src={rider.image}
                                                    alt={rider.name}
                                                    width="100%"
                                                    className="rounded mb-3"
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                                <div>
                                                    <p className="card-text">Series: {rider.series}</p>
                                                    <p className="card-text mb-3">Nama User: {rider.user}</p>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Link
                                                        to={`/riders/edit/${rider.id}`}
                                                        className="btn btn-sm btn-primary rounded shadow border-0 me-2"
                                                    >
                                                        EDIT
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteRider(rider.id)}
                                                        className="btn btn-sm btn-danger rounded shadow border-0"
                                                    >
                                                        DELETE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-danger text-center">
                                        Data Rider Belum Tersedia!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

