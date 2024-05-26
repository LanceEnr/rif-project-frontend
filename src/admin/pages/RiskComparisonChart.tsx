import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PrerequisiteDataDTO {
  unitType: string;
  riskLevel: string;
  submissionDate: string;
  riskType: string; // Added riskType to differentiate between Initial and Residual risks
}

const RiskComparisonChart: React.FC = () => {
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

  const processData = () => {
    const filteredData = data.filter(
      (item) => item.unitType === selectedUnitType
    );

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) =>
      (currentYear - i).toString()
    );

    const groupedData = years.reduce((acc, year) => {
      acc[year] = {
        Initial: { L: 0, M: 0, H: 0 },
        Residual: { L: 0, M: 0, H: 0 },
      };
      return acc;
    }, {} as { [key: string]: { [key: string]: { L: number; M: number; H: number } } });

    filteredData.forEach((item) => {
      const year = new Date(item.submissionDate).getFullYear().toString();
      if (groupedData[year] && groupedData[year][item.riskType]) {
        groupedData[year][item.riskType][
          item.riskLevel as "L" | "M" | "H"
        ] += 1;
      }
    });

    const chartsData = years.reverse().map((year) => {
      const labels = ["Initial", "Residual"];
      const initialLowRiskData = groupedData[year].Initial.L;
      const initialMediumRiskData = groupedData[year].Initial.M;
      const initialHighRiskData = groupedData[year].Initial.H;

      const residualLowRiskData = groupedData[year].Residual.L;
      const residualMediumRiskData = groupedData[year].Residual.M;
      const residualHighRiskData = groupedData[year].Residual.H;

      return {
        year,
        data: {
          labels,
          datasets: [
            {
              label: "Low Risk",
              data: [initialLowRiskData, residualLowRiskData],
              backgroundColor: "rgba(144, 238, 144, 0.6)", // Light Green for Low Risk
            },
            {
              label: "Medium Risk",
              data: [initialMediumRiskData, residualMediumRiskData],
              backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange for Medium Risk
            },
            {
              label: "High Risk",
              data: [initialHighRiskData, residualHighRiskData],
              backgroundColor: "rgba(255, 69, 0, 0.6)", // Red for High Risk
            },
          ],
        },
      };
    });

    return chartsData;
  };

  const chartData = processData();

  return (
    <div className="w-screen-xl px-4 min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Risk Comparison (Initial vs Residual)
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
        <h3 className="text-2xl font-bold mb-4">{selectedUnitType}</h3>
        {chartData.map((chart) => (
          <div key={chart.year} className="mb-8">
            <h3 className="text-xl font-bold mb-4">{`${chart.year}`}</h3>
            <Chart type="bar" data={chart.data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskComparisonChart;
