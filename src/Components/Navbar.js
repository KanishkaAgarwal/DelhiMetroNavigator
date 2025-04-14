// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo2.jpeg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div>
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/home" className="navbar-link">
                            <button className="navbar-button">Home</button>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/Contactus" className="navbar-link">
                            <button className="navbar-button">Contact Us</button>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">
                            <button className="navbar-button">Login</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;