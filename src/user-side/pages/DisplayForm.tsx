import React from "react";
import RiskFormsTable from "../components/RiskFormsTable";

const DisplayForm: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Web Form</h2>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <RiskFormsTable />
    </div>
  );
};

export default DisplayForm;
