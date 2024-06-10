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
// import Contact from "./user-side/pages/Contact";
import Navbar from "./user-side/components/Navbar";
import Footer from "./user-side/components/Footer";
import Users from "./admin/pages/Users";
import EditUser from "./admin/pages/EditUser";
import SubmissionHistory from "./user-side/pages/SubmissionHistory";
import RifTracker from "./admin/pages/RifTracker";
import SideNavbar from "./admin/components/SideNavbar";
import Prerequisites from "./user-side/pages/Prerequisites";
import Esignature from "./user-side/pages/Esignature";
import RiskIdentificationForm from "./user-side/pages/RiskIdentificationForm";
import RifTrackerTable from "./admin/pages/RifTrackerTable";
import MicroAnalytics from "./admin/pages/MicroAnalytics";
import MacroAnalytics from "./admin/pages/MacroAnalytics";
import Dashboard from "./admin/pages/Dashboard";
import NotFoundPage from "./user-side/pages/NotFoundPage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";
import SubmissionRateTable from "./admin/pages/SubmissionRateTable";
import IdentifiedRisks from "./admin/pages/IdentifiedRisks";
import IdentifiedRisksHistorical from "./admin/pages/IdentifiedRisksHistorical";
import SDAComparisonChart from "./admin/pages/SDAComparisonChart";
import RiskComparisonChart from "./admin/pages/RiskComparisonChart";
import ApproverDetails from "./user-side/pages/ApproverDetails";
import SubmissionHistoryApprover from "./user-side/pages/SubmissionHistoryApprover";
import SubmissionHistoryAdmin from "./admin/pages/SubmissionHistoryAdmin";

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/approver/*" element={<ApproverLayout />} />
          <Route path="/*" element={<UserLayout />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="submissions" element={<SubmissionHistoryAdmin />} />
            <Route path="tracker" element={<RifTracker />} />
            <Route path="trackertable" element={<RifTrackerTable />} />
            <Route path="users" element={<Users />} />
            <Route path="editUser" element={<EditUser />} />
            <Route path="microanalytics" element={<MicroAnalytics />} />
            <Route path="macroanalytics" element={<MacroAnalytics />} />
            <Route path="submissionrate" element={<SubmissionRateTable />} />
            <Route path="identifiedrisks" element={<IdentifiedRisks />} />
            <Route
              path="identifiedriskshistorical"
              element={<IdentifiedRisksHistorical />}
            />
            <Route path="sdacomparisonchart" element={<SDAComparisonChart />} />
            <Route
              path="riskcomparisonchart"
              element={<RiskComparisonChart />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const ApproverLayout: FC = () => {
  return (
    <ProtectedRoute allowedRoles={["ROLE_APPROVER"]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="approverdetails" element={<ApproverDetails />} />
        <Route
          path="submissionhistoryapprover"
          element={<SubmissionHistoryApprover />}
        />

        <Route path="faqs" element={<Faqs />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ProtectedRoute>
  );
};

const UserLayout: FC = () => {
  const { role } = useContext(AuthContext);

  if (role === "ROLE_ADMIN") {
    return <Navigate to="/admin" />;
  }

  if (role === "ROLE_APPROVER") {
    return <Navigate to="/approver" />;
  }

  return (
    <ProtectedRoute allowedRoles={["ROLE_USER"]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/prerequisites" element={<Prerequisites />} />
        <Route path="/esignature" element={<Esignature />} />
        <Route path="/form" element={<RiskIdentificationForm />} />
        <Route path="/form/:reportId" element={<RiskIdentificationForm />} />
        <Route path="/submissions" element={<SubmissionHistory />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ProtectedRoute>
  );
};

export default App;
