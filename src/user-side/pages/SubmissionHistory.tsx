import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AuthContext from "../../auth/AuthContext";
import PrintButton from "../components/PrintButton";
import riskform from "../../assets/riskformthumbnail.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RiskFormData {
  id: number;
  submissionDate: string;
  pdfProof: File | null;
  notes: string | null;
  fileError: string | null;
  charCount: number;
}

interface Report {
  id: number;
  riskFormData: RiskFormData[];
  status: string;
  approverComment: string | null;
}

const SubmissionHistory: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("Most Recent");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedRiskFormData, setSelectedRiskFormData] = useState<
    RiskFormData[]
  >([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  const MAX_CHARS = 500;

  const [selectedFilter, setSelectedFilter] = useState<
    "PENDING" | "FOR_REVISION" | "APPROVED" | "VERIFIED"
  >("PENDING");

  const handleDisplayChange = (
    display: "PENDING" | "FOR_REVISION" | "APPROVED" | "VERIFIED"
  ) => {
    setSelectedFilter(display);
  };

  useEffect(() => {
    const fetchReports = async () => {
      if (isAuthenticated) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            "http://localhost:8080/api/riskforms/reports",
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
  }, [isAuthenticated]);

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

    if (startDate && endDate) {
      sortedReports = sortedReports.filter((report) => {
        const reportDate = new Date(
          report.riskFormData[0]?.submissionDate || 0
        );
        return reportDate >= startDate && reportDate <= endDate;
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

    if (selectedFilter === "PENDING") {
      sortedReports = sortedReports.filter(
        (report) =>
          report.status !== "APPROVER_APPROVED" &&
          report.status !== "APPROVER_FOR_REVISION" &&
          report.status !== "ADMIN_VERIFIED"
      );
    } else if (selectedFilter === "FOR_REVISION") {
      sortedReports = sortedReports.filter(
        (report) => report.status === "APPROVER_FOR_REVISION"
      );
    } else if (selectedFilter === "APPROVED") {
      sortedReports = sortedReports.filter(
        (report) => report.status === "APPROVER_APPROVED"
      );
    } else if (selectedFilter === "VERIFIED") {
      sortedReports = sortedReports.filter(
        (report) => report.status === "ADMIN_VERIFIED"
      );
    }

    setFilteredReports(sortedReports);
  }, [filter, searchQuery, reports, startDate, endDate, selectedFilter]);

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

  const openCommentModal = (comment: string) => {
    setSelectedComment(comment);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedComment(null);
  };

  const handleProofChange = (index: number, file: File | null) => {
    const updatedRiskFormData = [...selectedRiskFormData];
    if (file && file.size > MAX_FILE_SIZE) {
      updatedRiskFormData[index].fileError = `File size exceeds ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB`;
    } else if (file && file.type !== "application/pdf") {
      updatedRiskFormData[index].fileError = "Only PDF files are allowed";
    } else {
      updatedRiskFormData[index].pdfProof = file;
      updatedRiskFormData[index].fileError = null;
    }
    setSelectedRiskFormData(updatedRiskFormData);
  };

  const handleNotesChange = (index: number, notes: string) => {
    if (notes.length > MAX_CHARS) return;
    const updatedRiskFormData = [...selectedRiskFormData];
    updatedRiskFormData[index] = {
      ...updatedRiskFormData[index],
      notes,
      charCount: notes.length,
    };
    setSelectedRiskFormData(updatedRiskFormData);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("reportId", selectedReportId!.toString());

    selectedRiskFormData.forEach((data) => {
      if (data.pdfProof) {
        formData.append(`pdfProofs`, data.pdfProof);
      }
      if (data.notes) {
        formData.append(`notes`, data.notes);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:8080/api/riskforms/update",
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
      console.error("Error submitting proof and notes:", error);
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVER_APPROVED":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
            Approved
          </span>
        );
      case "ADMIN_VERIFIED":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-400">
            Verified
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
    <div className="max-w-screen-xl mx-auto px-4 min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Submissions</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">View unit submissions</p>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
        <div className="flex justify-between">
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
          <div
            className="ml-2 inline-flex flex-col w-full rounded-md shadow-sm md:w-auto md:flex-row"
            role="group"
          >
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                selectedFilter === "PENDING"
                  ? "text-yellow-500 bg-yellow-100"
                  : "text-yellow-500 bg-white"
              } border border-gray-200 rounded-t-lg md:rounded-tr-none md:rounded-l-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white`}
              onClick={() => handleDisplayChange("PENDING")}
            >
              Pending
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                selectedFilter === "FOR_REVISION"
                  ? "text-red-500 bg-red-100"
                  : "text-red-500 bg-white"
              } border-gray-200 border-x md:border-x-0 md:border-t md:border-b hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white`}
              onClick={() => handleDisplayChange("FOR_REVISION")}
            >
              For Revision
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                selectedFilter === "APPROVED"
                  ? "text-green-500 bg-green-100"
                  : "text-green-500 bg-white"
              } border-gray-200 border-x md:border-x-0 md:border-l md:border-t md:border-b hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white`}
              onClick={() => handleDisplayChange("APPROVED")}
            >
              Approved
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                selectedFilter === "VERIFIED"
                  ? "text-blue-500 bg-blue-100"
                  : "text-blue-500 bg-white"
              } border border-gray-200 rounded-b-lg md:rounded-bl-none md:rounded-r-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white`}
              onClick={() => handleDisplayChange("VERIFIED")}
            >
              Verified
            </button>
          </div>
          <div className="ml-2 flex flex-col sm:flex-row items-center">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select A.Y. start date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2.5 mb-2 sm:mb-0"
            />
            <span className="mx-4 text-gray-500">to</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Select A.Y. end date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2.5"
            />
          </div>
        </div>
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
            placeholder="Search by ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="grid gap-7 lg:grid-cols-5 p-1 pl-18 relative">
        <Link
          to="/form"
          style={{ cursor: "pointer", transition: "all 1s ease" }}
          className="rounded-lg p-4 flex justify-center items-center border-dashed border-2 border-gray-400"
          onMouseOver={(event) =>
            (event.currentTarget.style.boxShadow =
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)")
          }
          onMouseOut={(event) => (event.currentTarget.style.boxShadow = "none")}
        >
          <svg
            className="h-16 w-24 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </Link>
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
                  <PrintButton reportId={report.id.toString()} />{" "}
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
                    {report.riskFormData.some((data) => data.pdfProof)
                      ? "View Proof"
                      : "Attach Proof"}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="#">
                    Edit
                  </Dropdown.Item>
                  {report.status === "APPROVER_FOR_REVISION" && (
                    <Dropdown.Item
                      onClick={() => openCommentModal(report.approverComment!)}
                    >
                      View Comment
                    </Dropdown.Item>
                  )}
                </Dropdown>
              </div>
              <div className="absolute top-2 right-2">
                {getStatusIcon(report.status)}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                  {selectedRiskFormData.some((data) => data.pdfProof)
                    ? "View Proof"
                    : "Attach Proof"}
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
              <form className="p-2 md:p-5">
                <div className="max-h-96 px-2 overflow-y-auto">
                  {selectedRiskFormData.map((data, index) => (
                    <div key={data.id} className="col-span-1">
                      <div className="flex justify-between">
                        <label className="block mb-2 text-md font-bold text-yellow-600 uppercase">
                          Row {index + 1}
                        </label>
                        <div className="flex justify-between">
                          {data.pdfProof && (
                            <button
                              type="button"
                              className="mr-2 mb-9 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 text-xs font-medium text-center text-white rounded inline-flex items-center"
                              onClick={() =>
                                viewPdfProof(selectedReportId!, data.id)
                              }
                            >
                              View PDF
                            </button>
                          )}
                          <div>
                            <input
                              className="block w-1/8 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                              id={`proof_${index}`}
                              type="file"
                              accept="application/pdf"
                              onChange={(e) =>
                                handleProofChange(
                                  index,
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                            />
                            <p
                              className="mt-1 text-xs text-right text-gray-500 dark:text-gray-300 mb-4"
                              id="file_input_help"
                            >
                              PDF (MAX. 20MB).
                            </p>
                          </div>
                        </div>
                      </div>
                      {data.fileError && (
                        <p className="text-red-600 text-xs mb-2">
                          {data.fileError}
                        </p>
                      )}
                      <textarea
                        name="notes"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="Notes"
                        value={data.notes || ""}
                        onChange={(e) =>
                          handleNotesChange(index, e.target.value)
                        }
                      ></textarea>
                      <p className="text-gray-500 text-xs text-right">
                        {data.charCount} / {MAX_CHARS}
                      </p>
                      <hr className="my-8" />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="text-white inline-flex w-full justify-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isCommentModalOpen && (
        <div
          id="comment-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-3xl">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Approver's Comment
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeCommentModal}
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
                <textarea
                  name="comment"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Approver's Comment"
                  value={selectedComment || ""}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;
