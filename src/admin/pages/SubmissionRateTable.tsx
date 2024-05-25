import React, { useEffect, useState } from "react";

interface ReportCount {
  academicCount: number;
  administrativeCount: number;
  academicUnitCount: number;
  administrativeUnitCount: number;
}

const SubmissionRateTable: React.FC = () => {
  const [data, setData] = useState<ReportCount>({
    academicCount: 0,
    administrativeCount: 0,
    academicUnitCount: 0,
    administrativeUnitCount: 0,
  });

  const token = localStorage.getItem("token");

  // Get current date and date one year ago
  const currentDate = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  // Format dates to yyyy-MM-dd
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState<string>(formatDate(oneYearAgo));
  const [endDate, setEndDate] = useState<string>(formatDate(currentDate));

  const fetchCounts = async () => {
    try {
      const academicResponse = await fetch(
        `http://localhost:8080/api/riskforms/unitTypeCount/academic/dateRange?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!academicResponse.ok) {
        throw new Error(`HTTP error! Status: ${academicResponse.status}`);
      }

      const academicData = await academicResponse.json();

      const administrativeResponse = await fetch(
        `http://localhost:8080/api/riskforms/unitTypeCount/administrative/dateRange?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!administrativeResponse.ok) {
        throw new Error(`HTTP error! Status: ${administrativeResponse.status}`);
      }

      const administrativeData = await administrativeResponse.json();

      const academicUnitResponse = await fetch(
        "http://localhost:8080/api/prerequisites/unitTypeCount/academic",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!academicUnitResponse.ok) {
        throw new Error(`HTTP error! Status: ${academicUnitResponse.status}`);
      }

      const academicUnitData = await academicUnitResponse.json();

      const administrativeUnitResponse = await fetch(
        "http://localhost:8080/api/prerequisites/unitTypeCount/administrative",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!administrativeUnitResponse.ok) {
        throw new Error(
          `HTTP error! Status: ${administrativeUnitResponse.status}`
        );
      }

      const administrativeUnitData = await administrativeUnitResponse.json();

      setData({
        academicCount: academicData,
        administrativeCount: administrativeData,
        academicUnitCount: academicUnitData,
        administrativeUnitCount: administrativeUnitData,
      });
    } catch (error) {
      console.error("Error fetching report counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [startDate, endDate, token]);

  const academicSubmissionRate = (
    (data.academicCount / data.academicUnitCount) *
    100
  ).toFixed(2);
  const administrativeSubmissionRate = (
    (data.administrativeCount / data.administrativeUnitCount) *
    100
  ).toFixed(2);

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
          Submission Rate
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
      <div id="print-section" className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <label htmlFor="startDate" className="mr-2">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex items-center ml-4">
              <label htmlFor="endDate" className="mr-2">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className=" text-xl font-bold mb-4">Academic Units</h3>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Total Acad Units
                </th>
                <th scope="col" className="px-6 py-3">
                  No. of Submissions
                </th>
                <th scope="col" className="px-6 py-3">
                  Submission Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b text-xl hover:bg-gray-100">
                <td className="px-6 py-6">{data.academicUnitCount}</td>
                <td className="px-6 py-6">{data.academicCount}</td>
                <td className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap">
                  {academicSubmissionRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className=" text-xl font-bold mb-4">Administrative Units</h3>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Total Admin Units
                </th>
                <th scope="col" className="px-6 py-3">
                  No. of Submissions
                </th>
                <th scope="col" className="px-6 py-3">
                  Submission Rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b text-xl hover:bg-gray-100">
                <td className="px-6 py-6">{data.administrativeUnitCount}</td>
                <td className="px-6 py-6">{data.administrativeCount}</td>
                <td className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap">
                  {administrativeSubmissionRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionRateTable;
