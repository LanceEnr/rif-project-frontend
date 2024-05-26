import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface PrerequisiteDataDTO {
  unitType: string;
  riskLevel: string;
  submissionDate: string;
}

const IdentifiedRisksHistorical: React.FC = () => {
  const [data, setData] = useState<PrerequisiteDataDTO[]>([]);
  const [selectedSdaNumber, setSelectedSdaNumber] = useState<number | null>(
    null
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSdaNumber !== null) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/riskforms/dataBySdaNumber/${selectedSdaNumber}`,
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

          const result: PrerequisiteDataDTO[] = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedSdaNumber, token]);

  const processData = (unitType: string) => {
    const filteredData = data.filter((item) => item.unitType === unitType);

    const groupedData = filteredData.reduce(
      (
        acc: {
          [key: string]: { L: number; M: number; H: number };
        },
        item
      ) => {
        const year = new Date(item.submissionDate).getFullYear().toString();
        if (!acc[year]) {
          acc[year] = { L: 0, M: 0, H: 0 };
        }
        acc[year][item.riskLevel as "L" | "M" | "H"] += 1;
        return acc;
      },
      {}
    );

    const labels = Object.keys(groupedData);
    const lowRiskData = Object.values(groupedData).map((d) => d.L);
    const mediumRiskData = Object.values(groupedData).map((d) => d.M);
    const highRiskData = Object.values(groupedData).map((d) => d.H);

    return {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Low Risk",
          data: lowRiskData,
          backgroundColor: "rgba(144, 238, 144, 0.6)", // Light Green for Low Risk
        },
        {
          type: "bar" as const,
          label: "Medium Risk",
          data: mediumRiskData,
          backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange for Medium Risk
        },
        {
          type: "bar" as const,
          label: "High Risk",
          data: highRiskData,
          backgroundColor: "rgba(255, 69, 0, 0.6)", // Red for High Risk
        },
        {
          type: "line" as const,
          label: "Low Risk Trend",
          data: lowRiskData,
          borderColor: "rgba(144, 238, 144, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          type: "line" as const,
          label: "Medium Risk Trend",
          data: mediumRiskData,
          borderColor: "rgba(255, 165, 0, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          type: "line" as const,
          label: "High Risk Trend",
          data: highRiskData,
          borderColor: "rgba(255, 69, 0, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  const academicChartData = processData("Academic");
  const administrativeChartData = processData("Administrative");

  return (
    <div className="w-screen-xl px-4 min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Identified Risks per SDA (Historical)
        </h2>

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
            <option value={1}>Leadership and Governance</option>
            <option value={2}>Thomasian Identity</option>
            <option value={3}>Teaching and Learning</option>
            <option value={4}>Research and Innovation</option>
            <option value={5}>Resource Management</option>
            <option value={6}>Public Presence</option>
            <option value={7}>Community Development and Advocacy</option>
            <option value={8}>Student Welfare and Services</option>
            <option value={9}>Internationalization</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Academic Units</h3>
          <Chart type="bar" data={academicChartData} />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Administrative Units</h3>
          <Chart type="bar" data={administrativeChartData} />
        </div>

        <table className="hidden w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-yellow-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Unit Type
              </th>
              <th scope="col" className="px-6 py-3">
                Risk Level
              </th>
              <th scope="col" className="px-6 py-3">
                Submission Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.unitType}
                  </td>
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.riskLevel}
                  </td>
                  <td className="px-6 py-4 text-gray-900 break-words whitespace-normal">
                    {item.submissionDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdentifiedRisksHistorical;
