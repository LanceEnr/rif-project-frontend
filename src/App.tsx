import React, { FC } from 'react';
import './App.css';
import Home from './pages/Home';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RIF from './pages/RIF';

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
