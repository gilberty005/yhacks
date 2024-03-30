import React from 'react';
import './footer.css';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { PiSpotifyLogoFill } from "react-icons/pi";

const socialLinks = [
    {
      id: 1,
      icon: <FaInstagram className="white-icon"/>,
      url: "https://www.instagram.com/gilberty005/",
    },
    {
      id: 2,
      icon: <FaGithub className="white-icon"/>,
      url: "https://github.com/gilberty005",
    },
    {
      id: 3,
      icon: <FaLinkedin className="white-icon"/>,
      url: "https://www.linkedin.com/in/gilbert-y-b3b901114/",
    },
    {
      id: 4,
      icon: <PiSpotifyLogoFill className="white-icon"/>,
      url: "https://open.spotify.com/user/rssy28luca89a00yw0jqxsynu",
    }
  ];

const Footer = () => (
    <div className="gilbert__footer section__padding">
      <div className="gilbert__footer-links">
      <div className="gilbert__footer-links_social"> {/* Move social icons div above */}
        {socialLinks.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </a>
        ))}
      </div>
      <div className="gilbert__footer-links_logo">
        <p>© 2024 by (Insert Team Name) with &lt;3</p>
      </div>
      </div>
    </div>
);
  
export default Footer;