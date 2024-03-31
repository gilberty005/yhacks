import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css'; 
import { Link } from 'react-router-dom';


const Menu = () => (
    <>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/contact">Lesson Generator</Link></p>
    <p><Link to="/script">Script Generator</Link></p>
    </>
);

const Navbar = ({ signOut }) => {
    const el = React.useRef(null);
    const [toggleMenu, setToggleMenu] = useState(false); 

    return (
        <div className="gilbert__navbar">
            <div className="gilbert__navbar-links">
                <div className="gilbert__navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="gilbert__navbar_menu">
            
            </div>
        </div>
    );
};

export default Navbar; 