import React, { FC } from "react";
import "./App.css";
import Home from "./user-side/pages/Home";
import Faqs from "./user-side/pages/Faqs";
import Contact from "./user-side/pages/Contact";
import Navbar from "./user-side/components/Navbar";
import Footer from "./user-side/components/Footer";
import RIF from "./user-side/pages/RIF";
import DocumentGrid from "./admin/pages/DocumentGrid";
import Users from "./admin/pages/Users";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RifTracker from "./admin/pages/RifTracker";
import SideNavbar from "./admin/components/SideNavbar";
import AddStakeholders from "./user-side/pages/AddStakeholders";
import Prerequisites from "./user-side/pages/Prerequisites";

const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <>
                <SideNavbar />
                <div className="p-4 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg mt-14">
                <Routes>


                  <Route path="grid" element={<DocumentGrid />} />
 
                  <Route path="tracker" element={<RifTracker />} />
                  <Route path="users" element={<Users />} />
                </Routes>
                </div>
                </div>
             
              </>
            }
          />

          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/FAQS" element={<Faqs />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="/RIF" element={<RIF />} />
                  <Route path="/addstakeholders" element={<AddStakeholders />} />
                  <Route path="/prerequisites" element={<Prerequisites />} />


                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
