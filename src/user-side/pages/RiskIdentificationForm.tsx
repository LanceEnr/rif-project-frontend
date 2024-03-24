import React, { useState, ChangeEvent, FormEvent } from "react";
import { Label, Radio } from "flowbite-react";

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "riskSEV" || name === "riskPROB") {
      const newRiskRating =
        name === "riskSEV"
          ? Number(value) * Number(formData.riskPROB)
          : Number(formData.riskSEV) * Number(value);
      setRiskRating(newRiskRating);
      setFormData((prevFormData) => ({
        ...prevFormData,
        riskRating: newRiskRating,
      }));
    }

    // Update errors state for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : "This field is required",
    }));

    // Clear global error if it's set and all fields are now valid
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
      setRowsData((prevRows) => [...prevRows, formData]);
      setFormData(initialState);
      setDate("");
      setError(null); // Clear any global error
    } else {
      setError("Please fill out all fields before adding another row.");
    }
  };

  const handleSubmitFinal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate only the current form data, not the rowsData length
    if (validateForm()) {
      const finalData = rowsData.length > 0 ? [...rowsData, formData] : [formData]; // Include the current formData, with rowsData if present
      
      try {
        const response = await fetch("http://localhost:8080/api/riskforms/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit report");
        }
  
        // Reset form to initial state after successful submission
        setFormData(initialState);
        setRowsData([]);
        setDate("");
        setRiskRating(0);
        setError(null); // Clear any global error
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting report:", error);
        setError("Failed to submit report. Please try again later.");
      }
    } else {
      // This error is for the overall form validation
      setError("Please fill out all fields before submitting.");
    }
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
        <div className="col-span-2 hidden sm:block">
          <p className="py-2 text-2xl font-semibold">Get Started</p>
          <p className="text-gray-600">Please fill out all the fields.</p>
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
                        value={formData.sdaNumber}
                        onChange={handleChange} // Add this onChange handler
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
                        value={formData.issueParticulars}
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
                            checked={formData.issueType === "Internal"}
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
                            checked={formData.issueType === "External"}
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
                        value={formData.riskParticulars}
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
                        value={formData.riskSEV}
                        onChange={handleChange} // Add this onChange handler
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
                        id="probability"
                        name="riskPROB"
                        value={formData.riskPROB}
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
                            value="riskL"
                            checked={formData.riskLevel === "riskL"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="risk-l">L</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-m"
                            name="riskLevel"
                            value="risk-m"
                            checked={formData.riskLevel === "risk-m"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="risk-m">M</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-h"
                            name="riskLevel"
                            value="risk-h"
                            checked={formData.riskLevel === "risk-h"}
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
                            value="risk-initial"
                            checked={formData.riskType === "risk-initial"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="risk-initial">Initial</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-residual"
                            name="riskType"
                            value="risk-residual"
                            checked={formData.riskType === "risk-residual"}
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
                              value={formData.opportunities}
                              onChange={handleChange} // Add this line
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
                              value={formData.actionPlan}
                              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                              placeholder="Write here..."
                              onChange={handleChange}
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
                          value={date}
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
                          name="responsiblePerson" // Ensure the name matches the FormData interface
                          value={formData.responsiblePerson}
                          onChange={handleChange} // Add this onChange handler
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
                            value="action-internal"
                            checked={formData.actionRad === "action-internal"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="action-internal">Internal</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="action-external"
                            name="actionRad"
                            value="action-external"
                            checked={formData.actionRad === "action-external"}
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
                          className="text-yellow-500 hover:text-white border border-yellow-500 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                        >
                          Go back
                        </button>
                      </div>
                      <div className="inline-flex items-end">
                      <button
                        type="button"
                        onClick={handleAddRow}
                        disabled={
                          rowsData.length === 0 &&
                          !Object.values(formData).some((value) => value)
                        }
                        className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white border border-transparent rounded-md mr-2 ${
                          rowsData.length === 0 &&
                          !Object.values(formData).some((value) => value)
                            ? "bg-gray-500"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        Add Another Row
                      </button>
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
