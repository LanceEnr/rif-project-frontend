import React from "react";
import { Link } from "react-router-dom";

const RiskIdentificationForm: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
        <div className="flex flex-col items-right">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">
            Risk Identification Form
          </h2>

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
              Accounts
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
            <p className="py-2 text-2xl font-semibold">Get Started</p>
            <p className="text-gray-600">Please fill out all the fields.</p>
          </div>

          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="mt-4 mb-10">
              <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-3">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Upload RIF (Optional)
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                          id="file_input"
                          type="file"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          SDA number
                        </label>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="0-9"
                          required
                        />
                      </div>
                      <div className="md:col-span-5">
                        <hr className="mt-4 mb-8" />

                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-bold text-gray-900"
                        >
                          ISSUE(S)
                        </label>
                      </div>

                      <div className="md:col-span-3">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Particulars
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Description"
                        ></textarea>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Check one
                        </label>
                        <div className="flex items-center mb-4">
                          <input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            Internal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            checked
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            External
                          </label>
                        </div>{" "}
                      </div>
                      <div className="md:col-span-5">
                        <hr className="mt-4 mb-8" />

                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-bold text-gray-900"
                        >
                          RISK(S)
                        </label>
                      </div>

                      <div className="md:col-span-5">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Particulars
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Description"
                        ></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          SEV
                        </label>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="0-9"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          PROB
                        </label>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="0-9"
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Risk Rating
                        </label>
                        <input
                          type="text"
                          id="disabled-input-2"
                          aria-label="disabled input 2"
                          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                          value="9"
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label
                          htmlFor="message"
                          className="block my-2 text-sm font-bold text-gray-900"
                        >
                          Risk Categorization
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Level
                        </label>
                        <div className="flex items-center mb-4">
                          <input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            L
                          </label>
                        </div>
                        <div className="flex items-center mb-4">
                          <input
                            checked
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            M
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="default-radio-3"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-3"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            H
                          </label>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Check one
                        </label>
                        <div className="flex items-center mb-4">
                          <input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            Initial
                          </label>
                        </div>
                        <div className="flex items-center mb-4">
                          <input
                            checked
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            Residual
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        <hr className="mt-4 mb-8" />

                        <div className="relative w-full">
                          <label
                            htmlFor="number-input"
                            className="block text-sm font-medium mb-2 text-gray-900"
                          >
                            Opportunities
                          </label>
                          <p
                            id="floating_helper_text"
                            className="my-2 text-xs text-gray-500 dark:text-gray-400"
                          >
                            Click on the plus button to add more entries...
                          </p>

                          <div className="relative flex items-center">
                            <div className="mr-3">1.</div>
                            <div className="relative flex-grow">
                              <input
                                type="text"
                                name="username"
                                id="username"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Write here..."
                                required
                              />
                              <button
                                type="button"
                                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-500 hover:bg-yellow-600 "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        <hr className="mt-4 mb-8" />

                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-bold text-gray-900"
                        >
                          ACTION(S) TAKEN
                        </label>
                      </div>

                      <div className="md:col-span-5">
                        <div className="relative w-full">
                          <label
                            htmlFor="number-input"
                            className="block text-sm font-medium mb-2 text-gray-900"
                          >
                            Action Plan
                          </label>
                          <p
                            id="floating_helper_text"
                            className="my-2 text-xs text-gray-500 dark:text-gray-400"
                          >
                            Click on the plus button to add more entries...
                          </p>

                          <div className="relative flex items-center">
                            <div className="mr-3">1.</div>
                            <div className="relative flex-grow">
                              <input
                                type="text"
                                name="username"
                                id="username"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                placeholder="Write here..."
                                required
                              />
                              <button
                                type="button"
                                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-500 hover:bg-yellow-600 "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          SDA number
                        </label>
                        <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            datepicker
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select date"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <form className="max-w-sm ">
                          <label
                            for="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Person Responsible
                          </label>
                          <select
                            id="countries"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>Choose one</option>
                            <option value="US">Dean</option>
                            <option value="CA">Asst. Dean</option>
                            <option value="FR">Program Chairs</option>
                            <option value="DE">Research Directors</option>
                          </select>
                        </form>
                      </div>

                      <div className="md:col-span-1">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Check one
                        </label>
                        <div className="flex items-center mb-4">
                          <input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            Internal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            checked
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500focus:ring-2"
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900"
                          >
                            External
                          </label>
                        </div>{" "}
                      </div>

                      <div className="md:col-span-5">
                        <hr className="mt-4 mb-8" />
                      </div>

                      <div className="md:col-span-5 flex justify-between">
                        <div className="inline-flex items-start">
                          <button
                            type="button"
                            className="text-white border-yellow-500 border-2 bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5"
                          >
                            Go Back
                          </button>
                        </div>
                        <div className="inline-flex items-end">
                          <button
                            type="button"
                            className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 border-2 mr-2"
                          >
                            Add Another Row
                          </button>
                          <button
                            type="submit"
                            className="text-white border-yellow-500 border-2 bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskIdentificationForm;
