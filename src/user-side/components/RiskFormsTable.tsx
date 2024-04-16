import React, { useEffect, useState } from "react";

interface Opportunity {
  description: string;
}

interface ActionPlan {
  description: string;
}

interface RiskFormData {
  sdaNumber: number;
  issueParticulars: string;
  issueType: string;
  riskParticulars: string;
  riskSEV: number;
  riskPROB: number;
  riskLevel: string;
  riskType: string;
  opportunities: Opportunity[];
  actionPlans: ActionPlan[];
  date: string;
  responsiblePerson: string;
  riskRating: number;
  actionRad: string;
}

const RiskFormsTable: React.FC = () => {
  const [riskForms, setRiskForms] = useState<RiskFormData[]>([]);

  useEffect(() => {
    fetchRiskForms();
  }, []);

  const fetchRiskForms = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/riskforms/report/103"
      );
      const data = await response.json();
      console.log(data); // Log the data to check its structure

      // Update this part to handle the actual structure of 'data'
      if (data && data.riskFormData) {
        setRiskForms(data.riskFormData); // Assuming 'riskFormData' is the array
      } else {
        setRiskForms([]); // Ensure state is always an array, set to empty if not structured as expected
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setRiskForms([]); // Set to empty array on error
    }
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              SDA Number
            </th>
            <th scope="col" className="py-3 px-6">
              Issue Particulars
            </th>
            <th scope="col" className="py-3 px-6">
              Issue Type
            </th>
            <th scope="col" className="py-3 px-6">
              Risk Particulars
            </th>
            <th scope="col" className="py-3 px-6">
              SEV
            </th>
            <th scope="col" className="py-3 px-6">
              PROB
            </th>
            <th scope="col" className="py-3 px-6">
              Risk Rating
            </th>
            <th scope="col" className="py-3 px-6">
              Risk Level
            </th>
            <th scope="col" className="py-3 px-6">
              Risk Type
            </th>
            <th scope="col" className="py-3 px-6">
              Opportunities
            </th>
            <th scope="col" className="py-3 px-6">
              Action Plans
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Responsible Person
            </th>
            <th scope="col" className="py-3 px-6">
              Action Rad
            </th>
          </tr>
        </thead>
        <tbody>
          {riskForms.map((form, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-4 px-6">{form.sdaNumber}</td>
              <td className="py-4 px-6">{form.issueParticulars}</td>
              <td className="py-4 px-6">{form.issueType}</td>
              <td className="py-4 px-6">{form.riskParticulars}</td>
              <td className="py-4 px-6">{form.riskSEV}</td>
              <td className="py-4 px-6">{form.riskPROB}</td>
              <td className="py-4 px-6">{form.riskRating}</td>
              <td className="py-4 px-6">{form.riskLevel}</td>
              <td className="py-4 px-6">{form.riskType}</td>
              <td className="py-4 px-6">
                {form.opportunities.map((o) => o.description).join(", ")}
              </td>
              <td className="py-4 px-6">
                {form.actionPlans.map((a) => a.description).join(", ")}
              </td>
              <td className="py-4 px-6">{form.date}</td>
              <td className="py-4 px-6">{form.responsiblePerson}</td>
              <td className="py-4 px-6">{form.actionRad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskFormsTable;
