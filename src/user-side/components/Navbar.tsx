import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";

const Navbar: React.FC = () => {
  return (
    <nav
      style={{ backgroundColor: "#121212" }}
      className="fixed w-full z-20 top-0 start-0 "
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://media.discordapp.net/attachments/1216948674119205025/1231642921552314488/Copy_of_Blue_and_White_Project_Proposal_-_Presentation-removebg-preview.png?ex=6637b3db&is=66253edb&hm=6a0b747914a2437581ac82fc3eaf01cebfb4a12c2ff9cdea815262c7d4d9541e&=&format=webp&quality=lossless"
            className="h-8 me-1"
            alt="FlowBite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">
            YellowAlert
          </span>
        </a>

        {/* User-menu and notif bell*/}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Dropdown
            label={
              <button
                type="button"
                data-dropdown-toggle="notification-dropdown"
                className="p-2 mr-1 text-gray-500 rounded-lg hover:text-yellow-500  "
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
            <Dropdown.Item>
              <div className="flex-shrink-0">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie Green avatar"
                />
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                  <svg
                    className="w-2 h-2 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  </svg>
                </div>
              </div>
              <div className="pl-3">
                <div className=" font-normal text-sm mb-1.5 ">
                  Your RIF submission has been{" "}
                  <span className="font-semibold text-green-600 ">
                    Approved
                  </span>
                </div>
                <div className="flex justify-start text-xs text-gray-500">
                  4:20 PM, Monday, March 11, 2024
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item>
              {" "}
              <div className="flex-shrink-0">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie Green avatar"
                />
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                  <svg
                    className="w-2 h-2 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  </svg>
                </div>
              </div>
              <div className="pl-3">
                <div className=" font-normal text-sm mb-1.5 ">
                  Your RIF submission has been{" "}
                  <span className="font-semibold text-red-600 ">Declined</span>
                </div>
                <div className="flex justify-start text-xs text-gray-500">
                  4:20 PM, Monday, March 11, 2024
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item>
              {" "}
              <div className="flex-shrink-0">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie Green avatar"
                />
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                  <svg
                    className="w-2 h-2 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  </svg>
                </div>
              </div>
              <div className="pl-3">
                <div className=" font-normal text-sm mb-1.5 ">
                  Your RIF submission has been{" "}
                  <span className="font-semibold text-green-600 ">
                    Approved
                  </span>
                </div>
                <div className="flex justify-start text-xs text-gray-500">
                  4:20 PM, Monday, March 11, 2024
                </div>
              </div>
            </Dropdown.Item>
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
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                View all
              </div>
            </Dropdown.Item>
          </Dropdown>

          <Dropdown
            label={
              <Avatar
                alt="User settings"
                img="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                rounded
              />
            }
            arrowIcon={false}
            inline
          >
            <Dropdown.Header>
              <span className="block text-sm">Lance Enriquez</span>
              <span className="block truncate text-sm font-medium">
                lancemikaelo@ust.edu.ph
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 "
          >
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/form"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 "
              >
                Form
              </Link>
            </li>
            <li>
              <Link
                to="/submissions"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 "
              >
                History
              </Link>
            </li>
            <li>
              <Link
                to="/prerequisites"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 "
              >
                Prerequisites
              </Link>
            </li>
            <li>
              <Link
                to="/FAQS"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 "
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 "
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
