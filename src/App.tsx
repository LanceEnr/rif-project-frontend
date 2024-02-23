import React, { FC } from 'react';
import './App.css';
import Home from './user-side/pages/Home';
import Faqs from './user-side/pages/Faqs';
import Contact from './user-side/pages/Contact';
import Navbar from './user-side/components/Navbar';
import NavbarAdmin from './admin/components/Navbar';
import Footer from './user-side/components/Footer';
import RIF from './user-side/pages/RIF';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/FAQS" element={<Faqs />} />
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/RIF" element={<RIF />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
