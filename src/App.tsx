import React, { FC } from "react";
import "./App.css";
import Home from "./user-side/pages/Home";
import Faqs from "./user-side/pages/Faqs";
import Contact from "./user-side/pages/Contact";
import Navbar from "./user-side/components/Navbar";
import NavbarAdmin from "./admin/components/Navbar";
import Footer from "./user-side/components/Footer";
import RIF from "./user-side/pages/RIF";
import RiskInputForm from "./admin/pages/RiskInputForm";
import DocumentGrid from "./admin/pages/DocumentGrid";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RifTracker from "./admin/pages/RifTracker";
import SideNavbar from "./admin/components/SideNavbar";

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

                  <Route path="risk" element={<RiskInputForm />} />{" "}
                  {/* Ganto maglagay sa LINK /admin/risk */}
                  <Route path="grid" element={<DocumentGrid />} />{" "}
                  {/* Ganto maglagay sa LINK /admin/grid */}
                  <Route path="tracker" element={<RifTracker />} />
   
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
