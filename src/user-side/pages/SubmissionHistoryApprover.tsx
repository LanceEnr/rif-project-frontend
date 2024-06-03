import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AuthContext from "../../auth/AuthContext";
import PrintButtonApprover from "../components/PrintButtonApprover";
import riskform from "../../assets/riskformthumbnail.jpg";

interface RiskFormData {
  id: number;
  submissionDate: string;
  pdfProof: File | null;
  notes: string | null;
}

interface Report {
  id: number;
  riskFormData: RiskFormData[];
  status: string;
  approverComment: string | null;
}

const MAX_CHARS = 500;

const SubmissionHistoryApprover: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("Most Recent");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isAuthenticated, user } = useContext(AuthContext);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedRiskFormData, setSelectedRiskFormData] = useState<
    RiskFormData[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [reportToApprove, setReportToApprove] = useState<number | null>(null);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionComment, setRevisionComment] = useState<string>("");

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
          console.log("Fetched reports:", data); // Debugging log
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

    console.log("Filtered reports:", sortedReports); // Debugging log
    setFilteredReports(sortedReports);
  }, [filter, searchQuery, reports]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const openModal = async (reportId: number) => {
    setSelectedReportId(reportId);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/riskforms/report/${reportId}`,
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
      const riskFormDataWithDefaults = data.riskFormData.map(
        (item: RiskFormData) => ({
          ...item,
          fileError: null,
          charCount: item.notes ? item.notes.length : 0,
        })
      );
      setSelectedRiskFormData(riskFormDataWithDefaults);
    } catch (error) {
      console.error("Error fetching risk form data:", error);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReportId(null);
    setSelectedRiskFormData([]);
  };

  const viewPdfProof = async (reportId: number, riskFormDataId: number) => {
    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/api/riskforms/report/${reportId}/pdf/${riskFormDataId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } else {
      console.error("Error fetching PDF proof");
    }
  };

  const approveReport = async () => {
    if (reportToApprove === null) return;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/riskforms/approve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reportId: reportToApprove }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Approve report response:", data); // Debugging log
      // Update the report status in the state
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportToApprove
            ? { ...report, status: "APPROVER_APPROVED", approverComment: null }
            : report
        )
      );
      setFilteredReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportToApprove
            ? { ...report, status: "APPROVER_APPROVED", approverComment: null }
            : report
        )
      );
    } catch (error) {
      console.error("Error approving report:", error);
    } finally {
      setIsApproveModalOpen(false);
      setReportToApprove(null);
    }
  };

  const confirmApproveReport = (reportId: number) => {
    setReportToApprove(reportId);
    setIsApproveModalOpen(true);
  };

  const cancelApproveReport = () => {
    setIsApproveModalOpen(false);
    setReportToApprove(null);
  };

  const confirmMarkForRevision = (reportId: number) => {
    setSelectedReportId(reportId);
    setIsRevisionModalOpen(true);
  };

  const cancelMarkForRevision = () => {
    setIsRevisionModalOpen(false);
    setRevisionComment("");
    setSelectedReportId(null);
  };

  const markReportForRevision = async () => {
    if (selectedReportId === null) return;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/riskforms/for-revision`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportId: selectedReportId,
            comment: revisionComment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Mark for revision response:", data); // Debugging log
      // Update the report status and comment in the state
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === selectedReportId
            ? {
                ...report,
                status: "APPROVER_FOR_REVISION",
                approverComment: revisionComment,
              }
            : report
        )
      );
      setFilteredReports((prevReports) =>
        prevReports.map((report) =>
          report.id === selectedReportId
            ? {
                ...report,
                status: "APPROVER_FOR_REVISION",
                approverComment: revisionComment,
              }
            : report
        )
      );
    } catch (error) {
      console.error("Error marking report for revision:", error);
    } finally {
      setIsRevisionModalOpen(false);
      setRevisionComment("");
      setSelectedReportId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    console.log("Status Icon for status:", status); // Debugging log
    switch (status) {
      case "APPROVER_APPROVED":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
            Approved
          </span>
        );
      case "APPROVER_FOR_REVISION":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-400">
            For Revision
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-300">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24 bg-gray-50">
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a 7 7 0 0 1 14 0Z"
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
            className="w-full bg-white rounded-lg shadow-md lg:max-w-sm relative"
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
                <div className="flex">
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
                  <Dropdown.Item
                    onClick={() => openModal(report.id)}
                    disabled={
                      !report.riskFormData.some((data) => data.pdfProof)
                    }
                    className={
                      !report.riskFormData.some((data) => data.pdfProof)
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }
                  >
                    View Proof
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-green-600"
                    onClick={() => confirmApproveReport(report.id)}
                  >
                    Approve
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-red-600"
                    onClick={() => confirmMarkForRevision(report.id)}
                  >
                    Mark for Revision
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className="absolute top-2 right-2">
                {getStatusIcon(report.status)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Confirm Approval</h2>
            <p className="mb-4">
              Are you sure you want to approve this report?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={cancelApproveReport}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={approveReport}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Leave a Comment for Revision
            </h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={5}
              placeholder="Enter your comment here..."
              value={revisionComment}
              onChange={(e) => setRevisionComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={cancelMarkForRevision}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={markReportForRevision}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-3xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View Proof
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
              <div className="p-2 md:p-5">
                <div className="max-h-96 px-2 overflow-y-auto">
                  {selectedRiskFormData
                    .filter((data) => data.notes || data.pdfProof)
                    .map((data, index) => (
                      <div key={data.id} className="col-span-1">
                        <div className="flex justify-between">
                          <label className="block mb-2 text-md font-bold text-yellow-600 uppercase">
                            Row {index + 1}
                          </label>
                          <div className="flex items-center">
                            {data.pdfProof && (
                              <button
                                type="button"
                                className="mr-2 mb-4 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-xs font-medium text-center text-white rounded inline-flex items-center"
                                onClick={() =>
                                  viewPdfProof(selectedReportId!, data.id)
                                }
                              >
                                View PDF
                              </button>
                            )}
                          </div>
                        </div>
                        <textarea
                          name="notes"
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                          placeholder="Notes"
                          value={data.notes || ""}
                          readOnly
                        ></textarea>
                        <hr className="my-8" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistoryApprover;