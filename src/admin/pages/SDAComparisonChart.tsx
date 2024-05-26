import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

interface PrerequisiteDataDTO {
  unitType: string;
  sdaNumber: number;
  riskLevel: string;
  submissionDate: string;
}

const SDAComparisonChart: React.FC = () => {
  const [data, setData] = useState<PrerequisiteDataDTO[]>([]);
  const [selectedUnitType, setSelectedUnitType] = useState<string>("Academic");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/riskforms/allData",
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
    };

    fetchData();
  }, [token]);

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

  const processData = () => {
    const filteredData = data.filter(
      (item) => item.unitType === selectedUnitType
    );

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) =>
      (currentYear - i).toString()
    );

    const groupedData = years.reduce((acc, year) => {
      acc[year] = Object.keys(sdaMapping).reduce((sdaAcc, sdaNumber) => {
        sdaAcc[sdaNumber as any] = 0;
        return sdaAcc;
      }, {} as { [key: string]: number });
      return acc;
    }, {} as { [key: string]: { [key: string]: number } });

    filteredData.forEach((item) => {
      const year = new Date(item.submissionDate).getFullYear().toString();
      if (groupedData[year]) {
        groupedData[year][item.sdaNumber] += 1;
      }
    });

    const labels = years.reverse();
    const datasets = Object.keys(sdaMapping).map((sdaNumber) => ({
      label: sdaMapping[parseInt(sdaNumber)],
      data: labels.map((year) => groupedData[year][sdaNumber]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    }));

    const totalSdaCounts = Object.keys(sdaMapping).map((sdaNumber) => ({
      sdaNumber: parseInt(sdaNumber),
      count: filteredData.filter(
        (item) => item.sdaNumber === parseInt(sdaNumber)
      ).length,
    }));

    totalSdaCounts.sort((a, b) => b.count - a.count);
    const topThreeSdas = totalSdaCounts
      .slice(0, 3)
      .map((item) => item.sdaNumber);

    const lineDatasets = topThreeSdas.map((sdaNumber, index) => ({
      type: "line" as const,
      label: `${sdaMapping[sdaNumber]} Trend`,
      data: labels.map((year) => groupedData[year][sdaNumber]),
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 2,
      fill: false,
    }));

    return { labels, datasets: [...datasets, ...lineDatasets] };
  };

  const chartData = processData();

  return (
    <div className="w-screen-xl px-4 min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Identified Risks per SDA Summary (Historical)
        </h2>

        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <label
            htmlFor="unitTypeSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Unit Type:
          </label>
          <select
            id="unitTypeSelect"
            value={selectedUnitType}
            onChange={(e) => setSelectedUnitType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
          </select>
        </div>
      </div>

      <div id="print-section" className="overflow-x-auto">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">{`${selectedUnitType} Units`}</h3>
          <Chart type="bar" data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default SDAComparisonChart;
