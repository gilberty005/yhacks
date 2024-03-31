import React, { useState, useEffect } from 'react';
import './header.css'; 
import Typed from 'typed.js';
import { useRef } from "react";
import Voronoi from '../../components/voronoi/voronoi';
import { Link } from 'react-router-dom';
import gilbert from '../../assets/teacher2.jpeg';
import script from '../../assets/script.jpeg';
import pic from '../../assets/pic.jpeg';


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
  const generateVoronoiStippling = async (imageUrl) => {
    // Generate the Voronoi stippling here and return the URL
    // For simplicity, let's assume it returns the URL of the generated stippling
    return imageUrl; // For now, return the same image URL
  };
  

const Header = () => {
  const [imageIndex, setImageIndex] = useState(0); // Index of the currently displayed image
  const [stipplings, setStipplings] = useState([]); // Array containing the pre-generated Voronoi stipplings
  const [imageLoaded, setImageLoaded] = useState(false); // Track if the stippled image is loaded

  useEffect(() => {
    // Preload Voronoi stippled images
    const preloadStippledImages = async () => {
      const stippledImages = await Promise.all([
        generateVoronoiStippling(gilbert),
        generateVoronoiStippling(script),
        generateVoronoiStippling(pic),
      ]);
      setStipplings(stippledImages);
      setImageLoaded(true); // Set imageLoaded to true when stippled images are loaded
    };

    preloadStippledImages();
  }, []);

  const handleHoverEdu = () => {
    setImageIndex(0); // Set the index to display the stippled image for educator
  };

  const handleHoverScript = () => {
    setImageIndex(1); // Set the index to display the stippled image for student
  };

  const handleHoverPic = () => {
    setImageIndex(2); // Set the index to display the stippled image for video 
  };
  return(
    <div className="gilbert__header section__padding">
      <div className="gilbert__header-content">
        <h1 className="gradient__text">Hi, there!</h1>
          <h1 className="gradient__text">
              You need a ...
          </h1>
        
        <div className="gilbert__header-content__input">
          <Link to="/contact"><button className="edu-btn" type="button" onMouseEnter={handleHoverEdu}>Lesson</button></Link>
          <Link to="/script"><button className="stu-btn" type="button" onMouseEnter={handleHoverScript}>Script</button></Link>
          <Link to="/video"><button className="stu-btn" type="button"onMouseEnter={handleHoverPic}>Video</button></Link>
        </div>
          <p className='subtext'>Welcome to the Future of Education!</p>
          <p className='quote'>
          <TypingText />
        </p>
      </div>
      <div className="gilbert__header-image">
        {/* Conditionally render Voronoi component only when image is loaded */}
        {imageLoaded && stipplings.length > 0 && (
          <Voronoi imageUrl={stipplings[imageIndex]} />
        )}
      </div>
    </div>
  );
};

export default Header;