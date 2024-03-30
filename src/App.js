import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/homefolder/home';
import { Contact } from './pages/contactfolder/contact';
import Footer from './containers/footer/Footer'
import Navbar from './components/navbar/Navbar';

const App = ( ) => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;