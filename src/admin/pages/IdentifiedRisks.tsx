import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RiskParticularDTO {
  description: string;
}

interface RiskFormDataGroupedDTO {
  sdaNumber: number;
  issueParticulars: string;
  riskParticularDescriptions: string[];
  unit: string;
  submissionDate: string;
  riskRating: number; // Ensure riskRating is included
}

const sdaMapping: { [key: number]: string } = {
  1: "Leadership and Governance",
  2: "Thomasian Identity",
  3: "Teaching and Learning",
  4: "Research and Innovation",
  5: "Resource Management",
  6: "Public Presence",
  7: "Community Development and Advocacy",
  8: "Student Welfare and Services",
  9: "Internationalization",
};

const IdentifiedRisks: React.FC = () => {
  const [data, setData] = useState<RiskFormDataGroupedDTO[]>([]);
  const [selectedSdaNumber, setSelectedSdaNumber] = useState<number | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<RiskFormDataGroupedDTO[]>(
    []
  );
  const [sortRiskRatingAsc, setSortRiskRatingAsc] = useState<boolean | null>(
    null
  );

  // Calculate default start date as one year ago
  const defaultStartDate = new Date();
  defaultStartDate.setFullYear(defaultStartDate.getFullYear() - 1);
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);

  // Calculate default end date as today
  const defaultEndDate = new Date();
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

  const [sortUnitAsc, setSortUnitAsc] = useState<boolean | null>(null);
  const token = localStorage.getItem("token"); // Adjust according to where you store your token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/riskforms/groupedBySdaNumber",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: RiskFormDataGroupedDTO[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching grouped data:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    let filtered = data;
    if (selectedSdaNumber !== null && selectedSdaNumber !== 0) {
      filtered = filtered.filter(
        (item) => item.sdaNumber === selectedSdaNumber
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.submissionDate) >= startDate &&
          new Date(item.submissionDate) <= endDate
      );
    }
    if (sortUnitAsc !== null) {
      filtered.sort((a, b) =>
        sortUnitAsc
          ? a.unit.localeCompare(b.unit)
          : b.unit.localeCompare(a.unit)
      );
    }
    if (sortRiskRatingAsc !== null) {
      filtered.sort((a, b) =>
        sortRiskRatingAsc
          ? a.riskRating - b.riskRating
          : b.riskRating - a.riskRating
      );
    }
    setFilteredData(filtered);
  }, [
    selectedSdaNumber,
    startDate,
    endDate,
    sortUnitAsc,
    sortRiskRatingAsc,
    data,
  ]);

  const renderTable = (
    filteredData: RiskFormDataGroupedDTO[],
    sdaNumber: number
  ) => (
    <>
      <h3 className="text-xl font-bold mb-4">{sdaMapping[sdaNumber]}</h3>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-left rtl:text-right shadow-md rounded-lg">
          <thead className="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" className="px-6 py-3  w-3/12">
                Issues
              </th>
              <th scope="col" className="px-6 py-3 w-3/12">
                Risks
              </th>
              <th scope="col" className="px-6 py-3 w-1/12">
                <div className="flex items-center">
                  Risk Rating
                  <button onClick={() => setSortRiskRatingAsc((prev) => !prev)}>
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-2/12">
                <div className="flex items-center">
                  Units
                  <button onClick={() => setSortUnitAsc((prev) => !prev)}>
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="hidden px-6 py-3">
                Submission Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-yellow-100 border-b border-yellow-300"
                >
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.issueParticulars}
                  </td>
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    <ul className="list-disc list-inside">
                      {item.riskParticularDescriptions.map(
                        (desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        )
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.riskRating}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 break-words whitespace-normal">
                    {item.unit}
                  </td>
                  <td className="hidden px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.submissionDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-yellow-100 border-b">
                <td colSpan={4} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

  const handlePrint = () => {
    const printContents = document.getElementById("print-section")!.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="w-screen-xl px-4 min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Identified Risks
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
            Risk Identification Form
          </p>
          <button
            onClick={handlePrint}
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Print
          </button>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <label
            htmlFor="sdaSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select SDA:
          </label>
          <select
            id="sdaSelect"
            value={selectedSdaNumber ?? ""}
            onChange={(e) => setSelectedSdaNumber(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="" disabled>
              Select SDA
            </option>
            <option value={0}>All</option>
            {Object.keys(sdaMapping).map((key) => (
              <option key={key} value={key}>
                {sdaMapping[Number(key)]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-column items-center justify-between space-y-4 pb-4">
          <div>
            <label
              htmlFor="sdaSelect"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Set Academic Year:
            </label>
            <div className="flex flex-column items-center ">
              <div className="flex items-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select start date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <span className="mx-4 text-gray-500">to</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select end date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="print-section">
        {selectedSdaNumber !== null && selectedSdaNumber !== 0
          ? renderTable(filteredData, selectedSdaNumber)
          : Object.keys(sdaMapping).map((key) =>
              renderTable(
                filteredData.filter((item) => item.sdaNumber === Number(key)),
                Number(key)
              )
            )}
      </div>
    </div>
  );
};

export default IdentifiedRisks;
