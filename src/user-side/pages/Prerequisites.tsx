import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";

const Prerequisites: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4  min-h-screen my-24">
        <div className="flex flex-col items-right">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">Settings</h2>

          <hr className="h-px my-8 border-yellow-500 border-2" />
        </div>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
            <label className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-yellow-500 peer-checked:ring">
              Accounts{" "}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">
                Accounts
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">
                Team
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">
                Others
              </li>
            </ul>
          </div>

          <div className="col-span-2 hidden sm:block">
            <ul>
              <li className="mt-5 cursor-pointer border-l-2 border-l-yellow-500 px-2 py-2 font-semibold text-yellow-500 transition hover:border-l-yellow-500 hover:text-yellow-500">
                Prerequisites
              </li>
              <Link to="/esignature">
                {" "}
                <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-yellow-500 hover:text-yellow-500">
                  E-Signature Upload
                </li>
              </Link>
            </ul>
          </div>

          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-yellow-100 sm:px-8 sm:shadow-md">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Prerequisites</h1>
            </div>
            <hr className="mt-4 mb-8" />

            <div className="mb-10">
              <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Administrative/Academic Unit
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="e.g. College of Education"
                    />
                  </div>

                  <div className="relative w-full mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <label
                          htmlFor="username"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Internal Client/Stakeholder
                        </label>
                        <p
                          id="floating_helper_text"
                          className="my-2 text-xs text-gray-500"
                        >
                          Use the "Add" button to include more entries.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-flex items-center"
                      >
                        <FiPlus className="mr-2" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="relative flex items-center mb-2">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="e.g. Academic Staff"
                      />
                      <button className="ml-2 py-1 px-3 rounded  text-red-500 hover:text-red-600 ">
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <label
                          htmlFor="username"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          External Client/Stakeholder
                        </label>
                        <p
                          id="floating_helper_text"
                          className="my-2 text-xs text-gray-500"
                        >
                          Use the "Add" button to include more entries.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-flex items-center"
                      >
                        <FiPlus className="mr-2" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="relative flex items-center mb-2">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="e.g. Parents & Guardians"
                      />
                      <button className="ml-2 py-1 px-3 rounded  text-red-500 hover:text-red-600 ">
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Save all
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prerequisites;
