/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//import useState and useEffect
import { useState, useEffect } from "react";

//import useNavigate
import { useNavigate } from "react-router-dom";

//import API
import api from '../api'; // Adjust relative path after moving api
import axios from "axios";

export default function RiderCreate() {
    // Define state for form data
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [user, setUser] = useState("");
    const [login, setLogin] = useState("");

    // State for validation errors
    const [errors, setErrors] = useState([]);

    // useNavigate hook for navigation
    const navigate = useNavigate();

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Method to handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Method to fetch login data
    const fetchLoginData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.get('http://localhost:8000/api/user')
            .then((response) => {
                setLogin(response.data);
            })
            .catch((error) => {
                console.error("Error fetching login data:", error);
                navigate("/"); // Redirect to login if there’s an error
            });
    };

    // Method to store rider data
    const storeRider = async (e) => {
        e.preventDefault();

        // Init FormData
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("series", series);
        formData.append("user", user);

        // Send data with API
        await api
            .post("/api/riders", formData)
            .then(() => {
                // Redirect to riders index after successful creation
                navigate("/riders");
            })
            .catch((error) => {
                // Set errors response to state "errors"
                setErrors(error.response.data);
            });
    };

    // useEffect to check token and fetch user data
    useEffect(() => {
        if (!token) {
            navigate("/"); // Redirect to login if token is not available
        } else {
            fetchLoginData(); // Fetch user data if token exists
        }
    }, [token, navigate]); // Dependency array

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeRider}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="form-control"
                                    />
                                    {errors.image && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.image[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Rider</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name Rider"
                                    />
                                    {errors.name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Series Asal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setSeries(e.target.value)}
                                        placeholder="Series Rider"
                                    />
                                    {errors.series && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.series[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama User</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setUser(e.target.value)}
                                        placeholder="User Rider"
                                    />
                                    {errors.user && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.user[0]}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
