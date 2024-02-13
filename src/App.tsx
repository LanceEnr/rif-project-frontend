import React from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <>
  <Router>
      <Navbar/>
      <Routes>
        {/* <Route path="/form" element={<Form/>} />
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/" element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
</>
  )
}

export default App
