import React from 'react';
import {Link} from 'react-router-dom';
import { buttonStyle } from './buttonStyle';
import logo from './icons.png';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: 'black', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                </div>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, marginLeft: 'auto' }}>
                    <li style={{ marginRight: '20px' }}>
                        <Link to="/home">
                        <button style={buttonStyle}>Home</button>
                        </Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link to="/Features">
                        <button style={buttonStyle}>Features</button>
                        </Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link to="/Contactus">
                        <button style={buttonStyle}>Contact Us</button>
                        </Link>
                    </li>
                    <li style={{ marginRight:  '20px' }}>
                        <Link to="/login">
                            <button style={buttonStyle}>Login</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;