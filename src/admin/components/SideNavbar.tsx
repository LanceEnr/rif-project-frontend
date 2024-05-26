import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import AuthContext from "../../auth/AuthContext";
import yellowalert from "../../assets/yellowalert.png";
import { MdDashboard } from "react-icons/md";
import { IoDocumentsSharp } from "react-icons/io5";
import { IoPieChartSharp } from "react-icons/io5";

const SideNavbar: React.FC = () => {
  const { isAuthenticated, user, displayRole, logout } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isRiskDataVisualizationOpen, setIsRiskDataVisualizationOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getUserInitials = () => {
    if (user && user.firstname && user.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    return "";
  };

  const toggleRiskDataVisualization = () => {
    setIsRiskDataVisualizationOpen(!isRiskDataVisualizationOpen);
  };

  return (
    <>
      <nav
        style={{ backgroundColor: "#121212" }}
        className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/admin" className="flex ms-2 md:me-24">
                <img
                  src={yellowalert}
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-yellow-500">
                  YellowAlert
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <Dropdown
                  label={
                    <button
                      type="button"
                      data-dropdown-toggle="notification-dropdown"
                      className="p-2 mr-1 text-gray-500 rounded-lg hover:text-yellow-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 14 20"
                      >
                        <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                      </svg>
                    </button>
                  }
                  placement="top"
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="text-center block truncate text-sm font-medium">
                      Notifications
                    </span>
                  </Dropdown.Header>
                  {/* Add notification items here */}
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <div className="inline-flex items-center ">
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      View all
                    </div>
                  </Dropdown.Item>
                </Dropdown>

                {isAuthenticated && user ? (
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
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  <Dropdown
                    label={
                      <button className="py-2 px-4 text-white rounded bg-yellow-500">
                        Login
                      </button>
                    }
                    arrowIcon={false}
                    inline
                  >
                    <Dropdown.Item>
                      <Link to="/login" className="block w-full text-left">
                        Login
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/register" className="block w-full text-left">
                        Register
                      </Link>
                    </Dropdown.Item>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isAuthenticated && (
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <MdDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="users"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="grid"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <IoDocumentsSharp className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />

                  <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={toggleRiskDataVisualization}
                >
                  <IoPieChartSharp className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Risk Data Visualization
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`py-2 space-y-2 ${
                    isRiskDataVisualizationOpen ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="submissionrate"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Submission Rate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="identifiedrisks"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Identified Risks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="identifiedriskshistorical"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Identified Risks per SDA
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="sdacomparisonchart"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Identified Risks per SDA Summary
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="riskcomparisonchart"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Initial Risks vs Residual Risks
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideNavbar;
