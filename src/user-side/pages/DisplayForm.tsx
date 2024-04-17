import React from "react";
import WebForm from "../components/WebForm";
import RiskFormsTable from "../components/RiskFormsTable";

const DisplayForm: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-20 min-h-screen my-24">
      <RiskFormsTable />
    </div>
  );
};

export default DisplayForm;
