import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../auth/AuthContext";
import yellowalert from "../../assets/yellowalert.png";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const Navbar: React.FC = () => {
  const { isAuthenticated, user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      fetch("http://localhost:8080/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text();
        })
        .then((text) => {
          try {
            const data = JSON.parse(text);
            setNotifications(data);
          } catch (error) {
            console.error("Error parsing JSON:", error, "Text received:", text);
          }
        })
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, [isAuthenticated]);

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

  if (role === "ROLE_ADMIN") {
    return null;
  }

  const getUserInitials = () => {
    if (user && user.firstname && user.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    return "";
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
      <nav
        style={{ backgroundColor: "#121212" }}
        className="fixed w-full z-20 top-0 start-0"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={yellowalert} className="h-8 me-1" alt="FlowBite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">
              YellowAlert
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isAuthenticated && user && (
              <>
                <Dropdown
                  label={
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-white w-5 h-5 cursor-pointer mr-3"
                    />
                  }
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="block text-sm text-yellow-500 uppercase">
                      Notifications
                    </span>
                  </Dropdown.Header>
                  <div className="max-h-60 overflow-y-auto"> {/* Add a max height and overflow for the notifications */}
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <Dropdown.Item key={notification.id}>
                          <div>{notification.message}</div>
                          <div className="text-xs text-gray-400">
                            {formatDate(notification.timestamp)}
                          </div>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No notifications</Dropdown.Item>
                    )}
                  </div>
                </Dropdown>

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
              </>
            )}

            <button
              type="button"
              onClick={toggleDrawer}
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
                      to="/prerequisites"
                      className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
                    >
                      Prerequisites
                    </Link>
                  </li>
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

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Home</span>
              </Link>
            </li>
            {isAuthenticated && role === "ROLE_USER" && (
              <>
                <li>
                  <Link
                    to="/prerequisites"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Prerequisites</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/form"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Form</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/submissions"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Submissions</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faqs"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">FAQs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Contact</span>
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && role === "ROLE_APPROVER" && (
              <>
                <li>
                  <Link
                    to="approverdetails"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Approver Details</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="submissionhistoryapprover"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Submissions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="faqs"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">FAQs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Contact</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
