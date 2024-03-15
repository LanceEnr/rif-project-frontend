import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Users: React.FC = () => {
  return (
    <div className="w-screen-xl px-4  min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Users</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">For user management</p>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
          {/* Dropdown */}
          <div>
            <Dropdown
              label=""
              inline
              dismissOnClick={false}
              renderTrigger={() => (
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
                  type="button"
                >
                  Filter
                  <MdKeyboardArrowDown className="ml-2 h-5 w-5" />
                </button>
              )}
            >
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Deactivated</Dropdown.Item>
              <Dropdown.Item>Admins</Dropdown.Item>
              <Dropdown.Item>Users</Dropdown.Item>
            </Dropdown>
          </div>
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
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        {/* User Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-100 ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-2"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  "
                  />
                  <label
                    htmlFor="checkbox-table-search-2"
                    className="sr-only"
                  ></label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-6/212452355_2957425344585931_358762392788928651_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=XHnIDAMRITkAX84EP8U&_nc_ht=scontent.fmnl25-4.fna&oh=00_AfD2qRTCpBrf0k7ejjaTU5kh_tNxLsavN9OZ73QBVpv3hg&oe=65E0872E"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">Neil Camacho</div>
                  <div className="font-normal text-gray-500">2020167888</div>
                </div>
              </th>
              <td className="px-6 py-4">User</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Active
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b  hover:bg-gray-100 ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-2"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                  />
                  <label
                    htmlFor="checkbox-table-search-2"
                    className="sr-only"
                  ></label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.15752-9/429804587_1091521518559038_6394353266186623924_n.png?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=pRnCBqIneGIAX8wM7f3&_nc_ht=scontent.fmnl25-1.fna&oh=03_AdRSJefnN-H6w4XNAOyemtXW3xAZLW1C4jjHzdmk17DCMg&oe=660CFB42"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">Charles Jose</div>
                  <div className="font-normal text-gray-500">2020178789</div>
                </div>
              </th>
              <td className="px-6 py-4">User</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Active
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-100">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-2"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                  />
                  <label
                    htmlFor="checkbox-table-search-2"
                    className="sr-only"
                  ></label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">Thomas Lean</div>
                  <div className="font-normal text-gray-500">2020898721</div>
                </div>
              </th>
              <td className="px-6 py-4">User</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Active
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
            <tr className="bg-white hover:bg-gray-100 ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-3"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                  />
                  <label
                    htmlFor="checkbox-table-search-3"
                    className="sr-only"
                  ></label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.nightcafe.studio//assets/man-in-suit.jpg?tr=w-1600,c-at_max"
                  alt="Jese image"
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    Leslie Livingston
                  </div>
                  <div className="font-normal text-gray-500">2020899829</div>
                </div>
              </th>
              <td className="px-6 py-4">User</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                  Deactivated
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
