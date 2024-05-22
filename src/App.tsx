import { FC, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthContext, { AuthProvider } from "./auth/AuthContext";
import Home from "./user-side/pages/Home";
import Faqs from "./user-side/pages/Faqs";
import Contact from "./user-side/pages/Contact";
import Navbar from "./user-side/components/Navbar";
import Footer from "./user-side/components/Footer";
import DocumentGrid from "./admin/pages/DocumentGrid";
import Users from "./admin/pages/Users";
import EditUser from "./admin/pages/EditUser";
import SubmissionHistory from "./user-side/pages/SubmissionHistory";
import RifTracker from "./admin/pages/RifTracker";
import SideNavbar from "./admin/components/SideNavbar";
import AddStakeholders from "./user-side/pages/AddStakeholders";
import Prerequisites from "./user-side/pages/Prerequisites";
import Esignature from "./user-side/pages/Esignature";
import RiskIdentificationForm from "./user-side/pages/RiskIdentificationForm";
import RifTrackerTable from "./admin/pages/RifTrackerTable";
import MicroAnalytics from "./admin/pages/MicroAnalytics";
import MacroAnalytics from "./admin/pages/MacroAnalytics";
import Dashboard from "./admin/pages/Dashboard";
import NotFoundPage from "./user-side/pages/NotFoundPage";
import DisplayForm from "./user-side/pages/DisplayForm";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/*" element={<UserLayout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const AdminLayout: FC = () => {
  return (
    <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
      <SideNavbar />
      <div className="p-4 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg mt-14">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="grid" element={<DocumentGrid />} />
            <Route path="tracker" element={<RifTracker />} />
            <Route path="trackertable" element={<RifTrackerTable />} />
            <Route path="users" element={<Users />} />
            <Route path="editUser" element={<EditUser />} />
            <Route path="microanalytics" element={<MicroAnalytics />} />
            <Route path="macroanalytics" element={<MacroAnalytics />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const UserLayout: FC = () => {
  const { role } = useContext(AuthContext);

  if (role === "ROLE_ADMIN") {
    return <Navigate to="/admin" />;
  }

  return (
    <ProtectedRoute allowedRoles={["ROLE_USER"]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addstakeholders" element={<AddStakeholders />} />
        <Route path="/prerequisites" element={<Prerequisites />} />
        <Route path="/esignature" element={<Esignature />} />
        <Route path="/form" element={<RiskIdentificationForm />} />
        <Route path="/submissions" element={<SubmissionHistory />} />
        <Route path="/displayform" element={<DisplayForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ProtectedRoute>
  );
};

export default App;
