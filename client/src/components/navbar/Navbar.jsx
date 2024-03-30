import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css'; 
import { Link } from 'react-router-dom';


const Menu = () => (
    <>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/contact">Contact</Link></p>
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
            {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
            {toggleMenu && (
                <div className="gilbert__navbar-menu_container scale-up-center">
                    <div className="gilbert__navbar-menu_container-links"> 
                        <Menu />
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Navbar; 