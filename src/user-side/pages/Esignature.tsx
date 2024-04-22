import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Esignature: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4  min-h-screen my-24">
        <div className="flex flex-col items-right">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">Settings</h2>

          <hr className="h-px my-8 border-yellow-500 border-2" />
        </div>{" "}
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="col-span-2 hidden sm:block">
            <ul>
              <Link to="/prerequisites">
                {" "}
                <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-yellow-500 hover:text-yellow-500">
                  Prerequisites
                </li>
              </Link>
              <li className="mt-5 cursor-pointer border-l-2 border-l-yellow-500 px-2 py-2 font-semibold text-yellow-500 transition hover:border-l-yellow-500 hover:text-yellow-500">
                E-Signature Upload
              </li>
            </ul>
          </div>

          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-yellow-100 sm:px-8 sm:shadow-md">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">
                E-Signature Upload
              </h1>
              <div className=" col-span-8 sm:hidden">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Navigation
                </label>
                <Dropdown
                  label=""
                  inline
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      id="dropdownActionButton"
                      data-dropdown-toggle="dropdownAction"
                      className="inline-flex w-full py-2.5 items-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  rounded-lg text-sm px-3 "
                      type="button"
                    >
                      <div className="flex justify-between w-full">
                        <span>E-signature Upload</span>
                        <MdKeyboardArrowDown className="h-5 w-5" />
                      </div>
                    </button>
                  )}
                >
                  <Dropdown.Item as={Link} to="/prerequisites">
                    Prerequisites
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="mb-10">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Upload your E-signature
              </label>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                By uploading your signature, you are providing explicit consent
                for us to store and use this data for the intended purpose. We
                are committed to protecting your personal data in compliance
                with the Data Privacy Act. Your signature will be stored
                securely and will not be shared with any third parties without
                your explicit consent.
              </p>
              <img
                className=" h-36 rounded"
                src="https://www.signwell.com/assets/vip-signatures/muhammad-ali-signature-3f9237f6fc48c3a04ba083117948e16ee7968aae521ae4ccebdfb8f22596ad22.svg"
                alt="Large avatar"
              />

              <div className="flex items-center justify-center w-full mb-4    ">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload your E-signature
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {" "}
                      PNG or JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Esignature;
