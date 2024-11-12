// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'gray' }} data-bs-theme="dark">
                <div className="container">
                    <img src="http://127.0.0.1:8000/storage/public/riders/kr-logo.png" height="100" className="p-0" alt="Logo" />
                    <Link to="/" className="navbar-brand">
                        HOME
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/riders" className="nav-link active" aria-current="page">
                                    RIDER LIST
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/riders/card" className="nav-link active" aria-current="page">
                                    RIDER CARD LIST
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
