import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/homefolder/home';
import { Contact } from './pages/contactfolder/contact';
import Footer from './containers/footer/Footer';
import Navbar from './components/navbar/Navbar';
import ScriptPage from './pages/script/script.js';

const App = ( ) => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/script" element={<ScriptPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;