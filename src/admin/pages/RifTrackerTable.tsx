import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";

const RifTrackerTable: React.FC = () => {
  return (
    <div className="w-screen-xl px-4  min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">RIF Tracker</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
            For tracking RIF submissions by different units.
          </p>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
          {/* Dropdown */}
          <Dropdown
            label=""
            inline
            dismissOnClick={false}
            renderTrigger={() => (
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                Filter
                <MdKeyboardArrowDown className="ml-2 h-5 w-5" />
              </button>
            )}
          >
            <Dropdown.Item>Highest SDA</Dropdown.Item>
            <Dropdown.Item>Lowest SDA</Dropdown.Item>
            <Dropdown.Item>Completed</Dropdown.Item>
            <Dropdown.Item>Incomplete</Dropdown.Item>
            <Dropdown.Item>Late</Dropdown.Item>
          </Dropdown>

          {/* Search input */}
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for units"
            />
          </div>
        </div>
        {/* User Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                SDA
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    College of Information and Computing Sciences
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Submitted
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>{" "}
                  6
                </div>
              </td>
              <td className="px-6 py-4">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      id="apple-imac-27-dropdown-button"
                      data-dropdown-toggle="apple-imac-27-dropdown"
                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  )}
                >
                  <Dropdown.Item as={Link} to="/admin/grid">
                    Submissions
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/microanalytics">
                    Analytics
                  </Dropdown.Item>
                </Dropdown>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Engineering-850x1024.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    Faculty of Engineering
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                  Incomplete
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  4
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Civil-Law.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    Faculty of Civil Law
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>{" "}
                  Late
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  3
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/07/College-of-Tourism-and-Hospitality-Management.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    College of Tourism and Hospitality Management
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Submitted
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>{" "}
                  5
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Medicine-and-Surgery.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    Faculty of Medicine and Surgery
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Submitted
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                  9
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b  bg-white hover:bg-gray-100 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/07/College-of-Architecture.png"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    College of Architecture
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Submitted
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                  9
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RifTrackerTable;
