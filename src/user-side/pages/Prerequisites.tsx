import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Prerequisites: React.FC = () => {
  const [internalStakeholders, setInternalStakeholders] = useState<string[]>([
    "",
  ]);
  const [externalStakeholders, setExternalStakeholders] = useState<string[]>([
    "",
  ]);

  const addInternalStakeholder = () => {
    setInternalStakeholders([...internalStakeholders, ""]);
  };

  const removeInternalStakeholder = (index: number) => {
    setInternalStakeholders(internalStakeholders.filter((_, i) => i !== index));
  };

  const addExternalStakeholder = () => {
    setExternalStakeholders([...externalStakeholders, ""]);
  };

  const removeExternalStakeholder = (index: number) => {
    setExternalStakeholders(externalStakeholders.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const unitInput = document.getElementById("unit") as HTMLInputElement;
    const url = "http://localhost:8080/api/prerequisites";
    const data = {
      unit: unitInput.value,
      internalStakeholders: internalStakeholders.map((_, index) => ({
        name: (
          document.querySelector(
            `input[name="internal-stakeholder-${index}"]`
          ) as HTMLInputElement
        ).value,
      })),
      externalStakeholders: externalStakeholders.map((_, index) => ({
        name: (
          document.querySelector(
            `input[name="external-stakeholder-${index}"]`
          ) as HTMLInputElement
        ).value,
      })),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Prerequisites saved successfully");
        alert("Data saved successfully!");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data");
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4  min-h-screen my-24">
        <div className="flex flex-col items-right">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">Settings</h2>

          <hr className="h-px my-8 border-yellow-500 border-2" />
        </div>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
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
                        <span>Prerequisities</span>
                        <MdKeyboardArrowDown className="h-5 w-5" />
                      </div>
                    </button>
                  )}
                >
                  <Dropdown.Item as={Link} to="/esignature">
                    E-signature Upload
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <hr className="mt-4 mb-8" />

            <div className="mb-10">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                  <div>
                    <label
                      htmlFor="unit"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Administrative/Academic Unit
                    </label>
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="e.g. College of Education"
                    />
                  </div>

                  <div className="relative w-full mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <label
                          htmlFor="internal-stakeholder"
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
                        onClick={addInternalStakeholder}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-flex items-center"
                      >
                        <FiPlus className="mr-2" />
                        <span>Add</span>
                      </button>
                    </div>
                    {internalStakeholders.map((_, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-center mb-2"
                      >
                        <input
                          type="text"
                          name={`internal-stakeholder-${index}`}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="e.g. Academic Staff"
                        />
                        <button
                          onClick={() => removeInternalStakeholder(index)}
                          className="ml-2 py-1 px-3 rounded text-red-500 hover:text-red-600"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="relative w-full mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <label
                          htmlFor="external-stakeholder"
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
                        onClick={addExternalStakeholder}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded inline-flex items-center"
                      >
                        <FiPlus className="mr-2" />
                        <span>Add</span>
                      </button>
                    </div>
                    {externalStakeholders.map((_, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-center mb-2"
                      >
                        <input
                          type="text"
                          name={`external-stakeholder-${index}`}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="e.g. Parents & Guardians"
                        />
                        <button
                          onClick={() => removeExternalStakeholder(index)}
                          className="ml-2 py-1 px-3 rounded text-red-500 hover:text-red-600"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))}
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
