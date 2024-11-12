/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from '../api'; // Adjust relative path after moving api

//import Link
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function RiderIndex() {
    // State for riders and user data
    const [riders, setRiders] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Method to fetch rider data
    const fetchDataRiders = async () => {
        // Fetch data from API with Axios
        await api.get("/api/riders").then((response) => {
            // Assign response data to state "riders"
            setRiders(response.data.data.data);
        });
    };

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

    // Method to delete rider
    const deleteRider = async (id) => {
        // Delete rider with API
        await api.delete(`/api/riders/${id}`).then(() => {
            // Fetch riders again after deletion
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
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                {/* <h3>Welcome, {user.name}</h3> Display user name */}
                                <table className="table table-bordered">
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Nama Rider</th>
                                            <th scope="col">Series</th>
                                            <th scope="col">Nama User</th>
                                            <th scope="col" style={{ width: "15%" }}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riders.length > 0 ? (
                                            riders.map((rider, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        <img
                                                            src={rider.image}
                                                            alt={rider.name}
                                                            width="200"
                                                            className="rounded"
                                                        />
                                                    </td>
                                                    <td>{rider.name}</td>
                                                    <td>{rider.series}</td>
                                                    <td>{rider.user}</td>
                                                    <td className="text-center">
                                                        <Link
                                                            to={`/riders/edit/${rider.id}`}
                                                            className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                                                        >
                                                            EDIT
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteRider(rider.id)}
                                                            className="btn btn-sm btn-danger rounded-sm shadow border-0"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Rider Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
