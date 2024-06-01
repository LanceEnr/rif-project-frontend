import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import AuthContext from "../../auth/AuthContext";
import yellowalert from "../../assets/yellowalert.png";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const roleMapping: { [key: string]: string } = {
    ROLE_USER: "User",
    ROLE_APPROVER: "Approver",
    ROLE_AUDITOR: "Auditor",
    ROLE_ADMIN: "Administrator",
  };

  const displayRole = roleMapping[role] || "Unknown Role";

  // If the role is "ROLE_ADMIN", do not render this navbar
  if (role === "ROLE_ADMIN") {
    return null;
  }

  const getUserInitials = () => {
    if (user && user.firstname && user.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    return "";
  };

  return (
    <nav
      style={{ backgroundColor: "#121212" }}
      className="fixed w-full z-20 top-0 start-0"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={yellowalert} className="h-8 me-1" alt="FlowBite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">
            YellowAlert
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated && user && (
            <Dropdown
              label={
                <div className="flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full">
                  {getUserInitials()}
                </div>
              }
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm text-yellow-500 uppercase">
                  {displayRole}
                </span>

                <span className="block text-sm">{`${user.firstname} ${user.lastname}`}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            style={{ backgroundColor: "#121212" }}
            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && role === "ROLE_USER" && (
              <>
                <li>
                  <Link
                    to="/form"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Form
                  </Link>
                </li>
                <li>
                  <Link
                    to="/submissions"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Submissions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prerequisites"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Prerequisites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && role === "ROLE_APPROVER" && (
              <>
                <li>
                  <Link
                    to="approverdetails"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Approver Details
                  </Link>
                </li>
                <li>
                  <Link
                    to="submissionhistoryapprover"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Submissions
                  </Link>
                </li>
                <li>
                  <Link
                    to="faqs"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
