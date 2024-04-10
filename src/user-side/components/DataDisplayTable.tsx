import React, { useState, useEffect } from 'react';

interface RiskFormData {
  id: number;
  report_id: number; // Assuming this is the correct naming convention
  sdaNumber: number;
  uploadRIF: string;
  issueParticulars: string;
  issueType: string;
  riskParticulars: string;
  riskPROB: number;
  riskSEV: number;
  riskRating: number;
  riskLevel: string;
  riskType: string;
  opportunities: string; // Assuming these are stringified JSON or similar
  actionPlan: string; // Assuming these are stringified JSON or similar
  date: string;
  responsiblePerson: string;
  actionRad: string;
}


const DataDisplayTable = () => {
  const [data, setData] = useState<RiskFormData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/riskforms');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: RiskFormData[] = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Ensure this array is empty to avoid refetching due to unintended state changes.  

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Report ID</th>
            <th scope="col" className="py-3 px-6">SDA Number</th>
            <th scope="col" className="py-3 px-6">Upload RIF</th>
            <th scope="col" className="py-3 px-6">Issue Particulars</th>
            <th scope="col" className="py-3 px-6">Issue Type</th>
            <th scope="col" className="py-3 px-6">Risk Particulars</th>
            <th scope="col" className="py-3 px-6">Risk PROB</th>
            <th scope="col" className="py-3 px-6">Risk SEV</th>
            <th scope="col" className="py-3 px-6">Risk Rating</th>
            <th scope="col" className="py-3 px-6">Risk Level</th>
            <th scope="col" className="py-3 px-6">Risk Type</th>
            <th scope="col" className="py-3 px-6">Opportunities</th>
            <th scope="col" className="py-3 px-6">Action Plan</th>
            <th scope="col" className="py-3 px-6">Date</th>
            <th scope="col" className="py-3 px-6">Responsible Person</th>
            <th scope="col" className="py-3 px-6">Action Rad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">{item.id}</td>
              <td className="py-4 px-6">{item.report_id}</td>
              <td className="py-4 px-6">{item.sdaNumber}</td>
              <td className="py-4 px-6">{item.uploadRIF}</td>
              <td className="py-4 px-6">{item.issueParticulars}</td>
              <td className="py-4 px-6">{item.issueType}</td>
              <td className="py-4 px-6">{item.riskParticulars}</td>
              <td className="py-4 px-6">{item.riskPROB}</td>
              <td className="py-4 px-6">{item.riskSEV}</td>
              <td className="py-4 px-6">{item.riskRating}</td>
              <td className="py-4 px-6">{item.riskLevel}</td>
              <td className="py-4 px-6">{item.riskType}</td>
              <td className="py-4 px-6">{item.opportunities}</td>
              <td className="py-4 px-6">{item.actionPlan}</td>
              <td className="py-4 px-6">{item.date}</td>
              <td className="py-4 px-6">{item.responsiblePerson}</td>
              <td className="py-4 px-6">{item.actionRad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplayTable;
