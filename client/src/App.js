import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/homefolder/home';
import { Contact } from './pages/contactfolder/contact';
import Footer from './containers/footer/Footer';
import Navbar from './components/navbar/Navbar';
import ScriptPage from './pages/script/script.js';
import Video from './pages/videofolder/video.js'
import Gallery from './pages/videoplayer/videoplayer.js'

const App = ( ) => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/script" element={<ScriptPage />} />
        <Route path="/video" element = {<Video />} /> 
        <Route path="/player" element = {<Gallery />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;