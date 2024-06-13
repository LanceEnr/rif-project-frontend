import React, { useState, useEffect, useRef } from "react";
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
import html2canvas from "html2canvas";

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
  unit: string;
  unitType: string;
  sdaNumber: number;
  riskLevel: string;
  submissionDate: string;
  riskType: string;
}

const SDAComparisonChartApprover: React.FC = () => {
  const [data, setData] = useState<PrerequisiteDataDTO[]>([]);
  const token = localStorage.getItem("token");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/riskforms/dataForApproverUnit",
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

    data.forEach((item) => {
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
      count: data.filter((item) => item.sdaNumber === parseInt(sdaNumber))
        .length,
    }));

    totalSdaCounts.sort((a, b) => b.count - a.count);
    const topThreeSdas = totalSdaCounts
      .slice(0, 3)
      .map((item) => item.sdaNumber);

    const lineDatasets = topThreeSdas.map((sdaNumber) => ({
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

  const handleDownloadImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Identified Risks per SDA Summary (Historical)
        </h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 mt-8 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadImage}
        >
          Download Chart
        </button>
      </div>

      <hr className="h-px my-8 border-yellow-500 border-2" />

      <div ref={chartRef} id="print-section" className="overflow-x-auto">
        <div className="mb-8">
          <Chart type="bar" data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default SDAComparisonChartApprover;
