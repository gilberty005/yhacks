import React from 'react';
import './header.css'; 
import Typed from 'typed.js';
import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const TypingText = () => {
    const el = useRef(() => {

    });
  
    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['Insert Quotes.'], 
        typeSpeed: 50, 
        loop: true,
      });
  
      return () => {
        typed.destroy();
      };
    }, []);
  
    return (
      <div>
        <span ref={el} />
      </div>
    );
  };

const Header = () => (
    <div className="gilbert__header section__padding">
      <div className="gilbert__header-content">
        <h1 className="gradient__text">Hello!</h1>
          <h1 className="gradient__text">
              <TypingText />
          </h1>
        <p className='subtext'>Welcome to the Future of Education</p>
        <div className="gilbert__header-content__input">
          <Link to="/contact"><button type="button">Let's connect</button></Link>
        </div>
      </div>
    </div>
  );

export default Header; 