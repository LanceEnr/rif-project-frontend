import React, { useState, ChangeEvent, FormEvent } from "react";
import { Label, Radio } from "flowbite-react";

// Define the interface for form data
interface FormData {
  sdaNumber: number | string;
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
  riskRating: string;
  actionRad: string;
  [key: string]: number | string | File | null; // Index signature
}

// Component
const RiskIdentificationForm: React.FC = () => {
  // Initial form state
  const initialState: FormData = {
    sdaNumber: "",
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
    riskRating: "",
    actionRad: "",
  };  

  const [formData, setFormData] = useState<FormData>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [date, setDate] = useState(""); // Add state for managing date input

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const requiredFields: (keyof FormData)[] = [
      "sdaNumber",
      "issueParticulars",
      "riskParticulars",
      "riskSEV",
      "riskPROB",
      "actionPlan",
      "responsiblePerson",
      "issueType",
      "riskLevel",
      "riskType",
      "actionRad",
    ];

    const isValid = requiredFields.every((field: keyof FormData) => {
      if (
        field === "issueType" ||
        field === "riskLevel" ||
        field === "riskType" ||
        field === "actionRad"
      ) {
        return !!formData[field]; // Ensure that at least one option is selected
      }
      return !!formData[field];
    });

    if (!isValid) {
      setError("Please fill out all the required fields.");
      return;
    }

    // Additional validation for riskSEV and riskPROB within a specific range
    const sev = Number(formData.riskSEV);
    const prob = Number(formData.riskPROB);
    if (sev < 0 || sev > 10 || prob < 0 || prob > 10) {
      setError("Risk SEV and PROB must be between 0 and 10.");
      return;
    }

    // Check if uploadRIF is a PDF file
    if (formData.uploadRIF && !formData.uploadRIF.name.endsWith(".pdf")) {
      setError("Please upload a PDF file for the RIF.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "uploadRIF") {
          formDataToSend.append(key, formData.uploadRIF as File);
        } else {
          formDataToSend.append(key, formData[key] as string);
        }
      }

      const response = await fetch("http://localhost:8080/api/riskforms/submit", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formDataToSend),
      });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        // Clear error on successful submission
    setError(null);

      // Reset form fields to initial state
      setFormData(initialState);
      setDate(""); // Reset date input field
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again later.");
    }
  };

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    // Validate the field
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error message for this field
      }));
    }
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploadRIF: file || null,
    }));
  };
  
  // Update the handleDateChange function to handle changes in the date input field
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: value,
    }));
    setDate(value);
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        type="text"
        name="actionPlan"
        value={formData.actionPlan}
        onChange={handleChange} // Add this onChange handler
        placeholder="Write here..."
      />
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
                        htmlFor="number-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        SDA number
                      </label>
                      <input
                        type="number"
                        name="sdaNumber"
                        value={formData.sdaNumber}
                        onChange={handleChange} // Add this onChange handler
                        id="number-input" // Ensure the id is unique
                        aria-describedby="helper-text-explanation"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0-9"
                      />
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
                        Issue Type
                      </label>
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-initial"
                            name="issueType"
                            value="Initial"
                            checked={formData.issueType === "Initial"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="issue-initial">Initial</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-residual"
                            name="issueType"
                            value="Residual"
                            checked={formData.issueType === "Residual"}
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            onChange={handleChange}
                          />
                          <Label htmlFor="issue-residual">Residual</Label>
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
                        htmlFor="number-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        SEV
                      </label>
                      <input
                        type="number"
                        name="riskSEV"
                        id="riskSEV-input" // Unique id value
                        value={formData.riskSEV}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0-9"
                        onChange={handleChange}
                      />
                      {errors.riskSEV && (
                        <p className="text-red-500">{errors.riskSEV}</p>
                      )}
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
                        name="riskPROB"
                        id="number-input"
                        value={formData.riskPROB}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="0-9"
                        onChange={handleChange}
                      />
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
                        Check one
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
                          type="submit"
                          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit
                        </button>
                        {error && (
                          <p className="ml-2 text-sm text-red-600">{error}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RiskIdentificationForm;
