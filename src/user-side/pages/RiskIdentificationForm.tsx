import React, { useState, ChangeEvent, FormEvent } from "react";
import { Label, Radio } from "flowbite-react";

interface FormData {
  sdaNumber: number | string;
  uploadRIF: string;
  issueParticulars: string;
  issueType: string;
  riskParticulars: string;
  riskSEV: string;
  riskPROB: string;
  riskRating: string;
  riskLevel: string;
  actionPlan: string;
  responsiblePerson: string;
}

const RiskIdentificationForm: React.FC = () => {
  const initialState: FormData = {
    sdaNumber: "",
    uploadRIF: "",
    issueParticulars: "",
    issueType: "",
    riskParticulars: "",
    riskSEV: "",
    riskPROB: "",
    riskRating: "",
    riskLevel: "",
    actionPlan: "",
    responsiblePerson: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "sdaNumber",
      "issueParticulars",
      "issueType",
      "riskParticulars",
      "riskSEV",
      "riskPROB",
      "riskRating",
      "riskLevel",
      "actionPlan",
      "responsiblePerson",
    ];
    const isValid = requiredFields.every(
      (field) => !!formData[field] || formData[field] === 0
    );

    if (!isValid) {
      setError("Please fill out all the required fields.");
      return;
    }

    try {
      const response = await fetch("/api/riskforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Clear error on successful submission
      setError(null);

      // Reset form fields
      setFormData(initialState);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      {/* Input fields */}
      <input
        type="number"
        name="sdaNumber"
        value={formData.sdaNumber}
        onChange={handleInputChange}
        placeholder="SDA Number"
      />
      <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
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

          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="mt-4 mb-10">
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
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-initial"
                            name="issue"
                            value="issue-initial"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            defaultChecked
                          />
                          <Label htmlFor="issue-initial">Initial</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="issue-residual"
                            name="issue"
                            value="issue-residual"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="issue-residual">Residual</Label>
                        </div>
                      </fieldset>
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
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-l"
                            name="risk-level"
                            value="risk-l"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="risk-l">L</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-m"
                            name="risk-level"
                            value="risk-m"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="risk-m">M</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-h"
                            name="risk-level"
                            value="risk-h"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="risk-h">H</Label>
                        </div>
                      </fieldset>
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Check one
                      </label>
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-initial"
                            name="risk-categorization"
                            value="risk-initial"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            defaultChecked
                          />
                          <Label htmlFor="risk-initial">Initial</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="risk-residual"
                            name="risk-categorization"
                            value="risk-residual"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="risk-residual">Residual</Label>
                        </div>
                      </fieldset>
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
                          className="my-2 text-xs text-gray-500"
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
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input
                          id="datetpick"
                          type="text"
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
                          id="countries"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                      <fieldset className="flex max-w-md flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Radio
                            id="action-internal"
                            name="actions-taken"
                            value="action-internal"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                            defaultChecked
                          />
                          <Label htmlFor="action-internal">Internal</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio
                            id="action-external"
                            name="actions-taken"
                            value="action-external"
                            className="checked:bg-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="action-external">External</Label>
                        </div>
                      </fieldset>
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
                        {/* Submit button */}
                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <button type="submit">Submit</button>
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
