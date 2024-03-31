import React from 'react';
import './header.css'; 
import Typed from 'typed.js';
import { useEffect, useRef } from "react";
import Voronoi from '../../components/voronoi/voronoi'
import { Link } from 'react-router-dom';
import gilbert from '../../assets/images.jpeg'
const TypingText = () => {
    const el = useRef(() => {

    });
  
    useEffect(() => {
      const typed = new Typed(el.current, {
        strings: ['"Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” — Malcolm X',
        '“The only person who is educated is the one who has learned how to learn …and change.” — Carl Rogers',
        '“Education is not the filling of a pot but the lighting of a fire.” — W.B. Yeats',
        '“Live as if you were to die tomorrow. Learn as if you were to live forever.” — Mahatma Gandhi',
        '“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela',
        '“The function of education is to teach one to think intensively and to think critically. Intelligence plus character – that is the goal of true education.” — Martin Luther King, Jr.',
        '“Education is the kindling of a flame, not the filling of a vessel.” — Socrates',
        '“Change is the end result of all true learning.” — Leo Buscaglia',
        '“Education is a progressive discovery of our own ignorance.” — Will Durant',
        '“Anyone who has never made a mistake has never tried anything new.” — Albert Einstein'], 
        typeSpeed: 25, 
        backDelay: 4500,
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
        <h1 className="gradient__text">Hi, there!</h1>
          <h1 className="gradient__text">
              You need a ...
          </h1>
        
        <div className="gilbert__header-content__input">
          <Link to="/contact"><button className="edu-btn" type="button">Lesson</button></Link>
          <Link to="/script"><button className="stu-btn" type="button">Script</button></Link>
          <Link to="/video"><button className="stu-btn" type="button">Video</button></Link>
        </div>
          <p className='subtext'>Welcome to the Future of Education!</p>
          <p className='quote'>
          <TypingText />
        </p>
      </div>
      <div className="gilbert__header-image">
        <Voronoi imageUrl={gilbert} />
      </div>
    </div>
  );

export default Header;