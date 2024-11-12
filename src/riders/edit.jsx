/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../api'; // Adjust relative path if needed

export default function RiderEdit() {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [user, setUser] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    // Get token from localStorage and use it to determine login status
    const token = localStorage.getItem("token");

    // Redirect to login if token is not available
    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            fetchDetailRider();
        }
    }, [token]); // Dependency on token to check if user is authenticated

    // Fetch rider details
    const fetchDetailRider = async () => {
        try {
            const response = await api.get(`/api/riders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token in the header
                },
            });
            setName(response.data.data.name);
            setSeries(response.data.data.series);
            setUser(response.data.data.user);
        } catch (error) {
            console.error("Error fetching rider details:", error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const updateRider = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("series", series);
        formData.append("user", user);
        formData.append("_method", "PUT");

        try {
            await api.post(`/api/riders/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/riders");
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updateRider}>
                                {/* Form Fields */}
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name Rider"
                                    />
                                    {errors.title && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.title[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Series Asal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={series}
                                        onChange={(e) => setSeries(e.target.value)}
                                        placeholder="Series Rider"
                                    />
                                    {errors.content && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.content[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama User</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        placeholder="User Rider"
                                    />
                                    {errors.content && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.content[0]}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
