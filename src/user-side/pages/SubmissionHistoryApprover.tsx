import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AuthContext from "../../auth/AuthContext";
import PrintButtonApprover from "../components/PrintButtonApprover";
import riskform from "../../assets/riskformthumbnail.jpg";

interface RiskFormData {
  id: number;
  submissionDate: string;
}

interface Report {
  id: number;
  riskFormData: RiskFormData[];
}

const SubmissionHistoryApprover: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("Most Recent");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (isAuthenticated && user) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            `http://localhost:8080/api/riskforms/unit/${user.unit}/email/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setReports(data);
          setFilteredReports(data);
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      }
    };

    fetchReports();
  }, [isAuthenticated, user]);

  useEffect(() => {
    let sortedReports = [...reports];

    if (filter === "Most Recent") {
      sortedReports.sort((a, b) => {
        const dateA = new Date(a.riskFormData[0]?.submissionDate || 0);
        const dateB = new Date(b.riskFormData[0]?.submissionDate || 0);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (filter === "Oldest") {
      sortedReports.sort((a, b) => {
        const dateA = new Date(a.riskFormData[0]?.submissionDate || 0);
        const dateB = new Date(b.riskFormData[0]?.submissionDate || 0);
        return dateA.getTime() - dateB.getTime();
      });
    }

    if (searchQuery) {
      sortedReports = sortedReports.filter(
        (report) =>
          report.riskFormData.some((data) =>
            data.submissionDate
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ) || report.id.toString().includes(searchQuery)
      );
    }

    setFilteredReports(sortedReports);
  }, [filter, searchQuery, reports]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const openModal = (reportId: number) => {
    setSelectedReportId(reportId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReportId(null);
    setFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (file && selectedReportId !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("reportId", selectedReportId.toString());

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/riskforms/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        closeModal();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Submissions</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">View unit submissions</p>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
        {/* Dropdown */}
        <div>
          <Dropdown
            label=""
            inline
            dismissOnClick={false}
            renderTrigger={() => (
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                Filter
                <MdKeyboardArrowDown className="ml-2 h-5 w-5" />
              </button>
            )}
          >
            <Dropdown.Item onClick={() => handleFilterChange("Most Recent")}>
              Most Recent
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("Oldest")}>
              Oldest
            </Dropdown.Item>
          </Dropdown>
        </div>
        {/* Search input */}
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by ID or Date"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid gap-7 lg:grid-cols-5 p-1 pl-18 relative">
        {filteredReports.map((report, index) => (
          <div
            className="w-full bg-white rounded-lg shadow-md lg:max-w-sm"
            key={report.id}
            style={{ cursor: "pointer" }}
          >
            <img
              className="object-cover w-full h-64 rounded-t-lg"
              src={riskform}
              alt="image"
            />
            <div className="p-4 rounded-b-lg">
              <h4 className="text-l font-semibold">
                {`Risk Identification Form ${index + 1}`}
              </h4>
              <p className="mb-2 leading-normal text-xs">
                Report ID: {report.id}
              </p>
              <div className="flex justify-between">
                <div className="flex ">
                  <PrintButtonApprover reportId={report.id.toString()} />{" "}
                  <p
                    className="mb-2 leading-normal text-xs font-normal"
                    style={{ color: "#2d3748" }}
                  >
                    {report.riskFormData[0]?.submissionDate || "No Date"}
                  </p>
                </div>
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      id="dropdown-button"
                      data-dropdown-toggle="dropdown"
                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none "
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  )}
                >
                  <Dropdown.Item onClick={() => openModal(report.id)}>
                    Attach Proof
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="#">
                    Duplicate and Edit
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Attach Proof
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-1">
                  <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Upload PDF file here
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept="application/pdf"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white inline-flex w-full justify-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistoryApprover;
