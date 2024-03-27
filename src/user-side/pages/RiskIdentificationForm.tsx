import React, { useState, ChangeEvent } from "react";
import { Label, Radio, Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";

// Define the interface for form data
interface FormData {
  sdaNumber: number;
  uploadRIF: File | null;
  issueParticulars: string;
  issueType: string;
  riskParticulars: string;
  riskSEV: number;
  riskPROB: number;
  riskLevel: string;
  riskType: string;
  opportunities: string;
  actionPlan: string;
  date: string;
  responsiblePerson: string;
  riskRating: number;
  actionRad: string;
  [key: string]: number | string | File | null; // Index signature
}

// Component
const RiskIdentificationForm: React.FC = () => {
  // Initial form state
  const initialState: FormData = {
    sdaNumber: 0,
    uploadRIF: null,
    issueParticulars: "",
    issueType: "",
    riskParticulars: "",
    riskSEV: 0,
    riskPROB: 0,
    riskLevel: "",
    riskType: "",
    opportunities: "",
    actionPlan: "",
    date: "",
    responsiblePerson: "",
    riskRating: 0,
    actionRad: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [date, setDate] = useState(""); // Add state for managing date input
  const [riskRating, setRiskRating] = useState(0);
  const [rowsData, setRowsData] = useState<FormData[]>([]);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  const rowsDropdownItems =
    rowsData.length > 0
      ? rowsData.map((_, index) => (
          <Dropdown.Item key={index} onClick={() => setActiveRowIndex(index)}>
            Row {index + 1}
          </Dropdown.Item>
        ))
      : [
          <Dropdown.Item key="no-rows" className="text-gray-500">
            No rows available
          </Dropdown.Item>,
        ];

  // Adjustments for the desktop version to include "No rows available" placeholder
  const rowsListItems =
    rowsData.length > 0 ? (
      rowsData.map((_, index) => (
        <li
          key={index}
          className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
            activeRowIndex === index
              ? "border-l-yellow-500 text-yellow-500"
              : "border-transparent hover:border-l-yellow-500 hover:text-yellow-500"
          }`}
          onClick={() => setActiveRowIndex(index)}
        >
          Row {index + 1}
        </li>
      ))
    ) : (
      <li className="text-gray-500">No rows available</li>
    );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers; keep others as strings.
    const isNumericField = [
      "riskSEV",
      "riskPROB",
      "sdaNumber",
      "riskRating",
    ].includes(name);
    let newValue: string | number = isNumericField ? Number(value) : value; // Ensures numeric fields are always numbers.

    if (activeRowIndex !== null) {
      // Update specific row in rowsData and recalculate the riskRating for that row if necessary
      const updatedRowsData = rowsData.map((rowData, index) => {
        if (index === activeRowIndex) {
          const updatedRow = { ...rowData, [name]: newValue };
          if (name === "riskSEV" || name === "riskPROB") {
            updatedRow.riskRating = updatedRow.riskSEV * updatedRow.riskPROB;
          }
          return updatedRow;
        }
        return rowData;
      });
      setRowsData(updatedRowsData);
      // Additionally, update the riskRating in the UI if SEV or PROB of the active row is changed
      if (name === "riskSEV" || name === "riskPROB") {
        const updatedRow = updatedRowsData[activeRowIndex];
        setRiskRating(updatedRow.riskRating);
      }
    } else {
      // Update formData for new input and recalculate riskRating if necessary
      const updatedFormData = { ...formData, [name]: newValue };
      if (name === "riskSEV" || name === "riskPROB") {
        updatedFormData.riskRating =
          updatedFormData.riskSEV * updatedFormData.riskPROB;
        setRiskRating(updatedFormData.riskRating);
      }
      setFormData(updatedFormData);
    }

    // Handle error states
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newValue.toString().trim() ? "" : "This field is required",
    }));

    // Clear global error if form is now valid
    if (error && validateForm()) {
      setError(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploadRIF: file || null,
    }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDate(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: value,
    }));

    // Clear date error if date is now valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      date: value.trim() ? "" : "This field is required",
    }));
  };

  // Validation function for the whole form
  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "uploadRIF" && (value === "" || value === 0)) {
        return false;
      }
    }
    return true;
  };

  const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const newRowData =
        activeRowIndex !== null
          ? rowsData.map((rowData, index) =>
              index === activeRowIndex ? formData : rowData
            )
          : [...rowsData, formData];

      setRowsData(newRowData);
      setFormData(initialState);
      setActiveRowIndex(null); // Clear active row selection
      setDate(""); // Reset any additional state, like date
      setRiskRating(0); // Reset risk rating if it's dynamically calculated
      setError(null); // Clear any global error messages
    } else {
      setError("Please fill out all fields before adding another row.");
    }
  };

  const handleSubmitFinal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Checking if there are unsaved changes in formData when trying to submit
    if (activeRowIndex === null && validateForm()) {
      // Add the current formData to rowsData before submitting
      setRowsData([...rowsData, formData]);
      await submitData([...rowsData, formData]); // Pass the combined array to the submission function
    } else if (rowsData.length > 0) {
      await submitData(rowsData); // Submit existing rowsData
    } else {
      setError("Please fill out the form before submitting.");
    }
  };

  // Abstracted function for data submission to keep handleSubmitFinal clean
  const submitData = async (data: FormData[]) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/riskforms/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to submit report");

      alert("Form submitted successfully!");
      resetFormState(); // Resetting form state after successful submission
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Failed to submit report. Please try again later.");
    }
  };

  // Function to reset form state, abstracted for reuse
  const resetFormState = () => {
    setFormData(initialState);
    setRowsData([]);
    setActiveRowIndex(null);
    setDate("");
    setRiskRating(0);
    setError(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4   min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Risk Identification Form
        </h2>

        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="relative my-4 w-56 sm:hidden">
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
                Rows <MdKeyboardArrowDown className="ml-2 h-5 w-5" />
              </button>
            )}
          >
            {rowsDropdownItems}
          </Dropdown>
        </div>

        <div className="col-span-2 hidden sm:block">
          <ul>{rowsListItems}</ul>
        </div>

        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-yellow-100 sm:px-8 sm:shadow">
          <div className="mt-4 mb-10">
            <div className="grid gap-4 mb-4 sm:grid-cols-1">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmitFinal} method="post">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label
                        htmlFor="file_input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Upload RIF (Optional)
                      </label>
                      <input
                        type="file"
                        name="uploadRIF"
                        onChange={handleFileChange}
                        accept=".pdf"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="sdaNumber"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        SDA Number
                      </label>
                      <select
                        id="sdaNumber"
                        name="sdaNumber"
                        value={
                          activeRowIndex !== null
                            ? rowsData[activeRowIndex].sdaNumber
                            : formData.sdaNumber
                        }
                        onChange={handleChange}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Select an option</option>
                        <option value="1">1 - Leadership and Governance</option>
                        <option value="2">2 - Thomasian Identity</option>
                        <option value="3">3 - Teaching and Learning</option>
                        <option value="4">4 - Research and Innovation</option>
                        <option value="5">5 - Resource Management</option>
                        <option value="6">6 - Public Presence</option>
                        <option value="7">
                          7 - Community Development and Advocacy
                        </option>
                        <option value="8">
                          8 - Student Welfare and Services
                        </option>
                        <option value="9">9 - Internationalization</option>
                      </select>
                      {errors.sdaNumber && (
                        <p className="text-red-500">{errors.sdaNumber}</p>
                      )}
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
                        name="issueParticulars"
                        rows={4}
                        value={
                          activeRowIndex !== null
                            ? rowsData[activeRowIndex].issueParticulars
                            : formData.issueParticulars
                        }
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description"
                        onChange={handleChange}
                      ></textarea>

                      {errors.issueParticulars && (
                        <p className="text-red-500">
                          {errors.issueParticulars}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Choose one
                      </label>
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-internal"
                            name="issueType"
                            value="Internal"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].issueType ===
                                  "Internal"
                                : formData.issueType === "Internal"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="issue-internal">Internal</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-external"
                            name="issueType"
                            value="External"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].issueType ===
                                  "External"
                                : formData.issueType === "External"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="issue-external">External</Label>
                        </div>
                      </fieldset>
                      {errors.issueType && (
                        <p className="text-red-500">{errors.issueType}</p>
                      )}
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
                        name="riskParticulars"
                        rows={4}
                        value={
                          activeRowIndex !== null
                            ? rowsData[activeRowIndex].riskParticulars
                            : formData.riskParticulars
                        }
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description"
                        onChange={handleChange}
                      ></textarea>
                      {errors.riskParticulars && (
                        <p className="text-red-500">{errors.riskParticulars}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="riskSEV"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Severity (SEV)
                      </label>
                      <select
                        id="riskSEV"
                        name="riskSEV"
                        value={
                          activeRowIndex !== null
                            ? rowsData[activeRowIndex].riskSEV
                            : formData.riskSEV
                        }
                        onChange={handleChange}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Select an option</option>
                        <option value="1">1 - Insignificant</option>
                        <option value="2">2 - Slight</option>
                        <option value="3">3 - Moderate</option>
                        <option value="4">4 - Severe</option>
                        <option value="5">5 - Very Severe</option>
                      </select>
                      {errors.riskSEV && (
                        <p className="text-red-500">{errors.riskSEV}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="probability"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Probability (PROB)
                      </label>
                      <select
                        id="riskPROB"
                        name="riskPROB"
                        value={
                          activeRowIndex !== null
                            ? rowsData[activeRowIndex].riskPROB
                            : formData.riskPROB
                        }
                        onChange={handleChange}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Select probability</option>
                        <option value="1">1 - Extremely Unlikely</option>
                        <option value="2">2 - Very Unlikely</option>
                        <option value="3">3 - Unlikely</option>
                        <option value="4">4 - Likely</option>
                        <option value="5">5 - Very Likely</option>
                      </select>
                      {errors.riskPROB && (
                        <p className="text-red-500">{errors.riskPROB}</p>
                      )}
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
                        name="riskRating"
                        id="disabled-input-2"
                        aria-label="disabled input 2"
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                        value={riskRating}
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
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-l"
                            name="riskLevel"
                            value="L"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].riskLevel === "L"
                                : formData.riskLevel === "L"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="risk-l">L</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-m"
                            name="riskLevel"
                            value="M"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].riskLevel === "M"
                                : formData.riskLevel === "M"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="risk-m">M</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-h"
                            name="riskLevel"
                            value="H"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].riskLevel === "H"
                                : formData.riskLevel === "H"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="risk-h">H</Label>
                        </div>
                      </fieldset>
                      {errors.riskLevel && (
                        <p className="text-red-500">{errors.riskLevel}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Issue Type
                      </label>
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-initial"
                            name="riskType"
                            value="Initial"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].riskType ===
                                  "Initial"
                                : formData.riskType === "Initial"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="risk-initial">Initial</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-residual"
                            name="riskType"
                            value="Residual"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].riskType ===
                                  "Residual"
                                : formData.riskType === "Residual"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="risk-residual">Residual</Label>
                        </div>
                      </fieldset>
                      {errors.riskType && (
                        <p className="text-red-500">{errors.riskType}</p>
                      )}
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
                          className="my-2 text-xs text-gray-500"
                        >
                          Click on the plus button to add more entries...
                        </p>

                        <div className="relative flex items-center">
                          <div className="mr-3">1.</div>
                          <div className="relative flex-grow">
                            <input
                              type="text"
                              name="opportunities"
                              id="opportunities"
                              value={
                                activeRowIndex !== null
                                  ? rowsData[activeRowIndex].opportunities
                                  : formData.opportunities
                              }
                              onChange={handleChange}
                              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                              placeholder="Write here..."
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
                          className="my-2 text-xs text-gray-500"
                        >
                          Click on the plus button to add more entries...
                        </p>

                        <div className="relative flex items-center">
                          <div className="mr-3">1.</div>
                          <div className="relative flex-grow">
                            <input
                              type="text"
                              name="actionPlan"
                              id="Entries"
                              value={
                                activeRowIndex !== null
                                  ? rowsData[activeRowIndex].actionPlan
                                  : formData.actionPlan
                              }
                              onChange={handleChange}
                              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                              placeholder="Write here..."
                            />

                            {errors.actionPlan && (
                              <p className="text-red-500">
                                {errors.actionPlan}
                              </p>
                            )}
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
                        htmlFor="datepicker"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Date
                      </label>
                      <div className="relative max-w-sm">
                        <input
                          id="datepicker"
                          name="date"
                          type="date"
                          value={
                            activeRowIndex !== null
                              ? rowsData[activeRowIndex].date
                              : date
                          }
                          onChange={handleDateChange}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                          placeholder="Select date"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <form className="max-w-sm ">
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Person Responsible
                        </label>
                        <select
                          id="personResponsible"
                          name="responsiblePerson"
                          value={
                            activeRowIndex !== null
                              ? rowsData[activeRowIndex].responsiblePerson
                              : formData.responsiblePerson
                          }
                          onChange={handleChange}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option value="">Choose one</option>
                          <option value="Dean">Dean</option>
                          <option value="Asst. Dean">Asst. Dean</option>
                          <option value="Program Chairs">Program Chairs</option>
                          <option value="Research Directors">
                            Research Directors
                          </option>
                        </select>
                        {errors.responsiblePerson && (
                          <p className="text-red-500">
                            {errors.responsiblePerson}
                          </p>
                        )}
                      </form>
                    </div>

                    <div className="md:col-span-1">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Choose one
                      </label>
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="action-internal"
                            name="actionRad"
                            value="Internal"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].actionRad ===
                                  "Internal"
                                : formData.actionRad === "Internal"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="action-internal">Internal</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="action-external"
                            name="actionRad"
                            value="External"
                            checked={
                              activeRowIndex !== null
                                ? rowsData[activeRowIndex].actionRad ===
                                  "External"
                                : formData.actionRad === "External"
                            }
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />

                          <Label htmlFor="action-external">External</Label>
                        </div>
                      </fieldset>
                      {errors.actionRad && (
                        <p className="text-red-500">{errors.actionRad}</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <hr className="mt-4 mb-8" />
                    </div>
                    <div className="md:col-span-5 flex justify-between">
                      <div className="inline-flex items-start">
                        <button
                          type="button"
                          onClick={handleAddRow}
                          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white border border-transparent rounded-md bg-blue-500 hover:bg-blue-600"
                        >
                          Add Another Row
                        </button>
                      </div>
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          disabled={
                            rowsData.length === 0 &&
                            !Object.values(formData).some((value) => value)
                          } // Disable if rowsData is empty and current form data is not filled
                          className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white border border-transparent rounded-md ${
                            rowsData.length === 0 &&
                            !Object.values(formData).some((value) => value)
                              ? "bg-gray-500"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          Submit
                        </button>
                        {error && (
                          <p className="ml-2 text-sm text-red-600">{error}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskIdentificationForm;
