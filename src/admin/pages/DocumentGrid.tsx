import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { MdKeyboardArrowDown } from "react-icons/md";
import AuthContext from "../../auth/AuthContext";
import PrintButtonAdmin from "../../admin/components/PrintButtonAdmin";

interface Post {
  id: number;
  title: string;
  img: string;
  content: string;
  date: string;
  submissionDate: string;
  userId: number;
}

interface Prerequisite {
  unit: string;
  userId: number;
}

const DocumentGrid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchAllPrerequisites = async (): Promise<Prerequisite[]> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/api/prerequisites/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  useEffect(() => {
    const fetchReports = async () => {
      if (isAuthenticated) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            "http://localhost:8080/api/riskforms/all-reports",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Reports data:", data);

          const fetchedPrerequisites = await fetchAllPrerequisites();
          console.log("Fetched prerequisites:", fetchedPrerequisites);

          // Ensure prerequisites are mapped correctly
          const transformedPosts: Post[] = data.map((report: any) => {
            console.log("Processing report:", report);

            const prerequisite = fetchedPrerequisites.find(prereq => prereq.userId === report.userId);
            console.log("Mapped prerequisite for userId", report.userId, ":", prerequisite);

            return {
              id: report.id,
              title: `Risk Forms ${report.id} - ${prerequisite ? prerequisite.unit : 'Not Available'}`,
              img: "https://www.pdffiller.com/preview/332/872/332872673.png",
              date: report.submissionDate,
              submissionDate: report.riskFormData[0]?.submissionDate || "No Date",
              userId: report.userId,
            };
          });

          setPosts(transformedPosts);
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      }
    };

    fetchReports();
  }, [isAuthenticated]);

  return (
    <div className="w-screen-xl px-4 min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Submissions</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
            Office of Planning and Quality Management
          </p>
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
            <Dropdown.Item>Most Recent</Dropdown.Item>
            <Dropdown.Item>Oldest</Dropdown.Item>
          </Dropdown>
          <Dropdown
            label=""
            inline
            dismissOnClick={false}
            renderTrigger={() => (
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex ml-2 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                Academic Year
                <MdKeyboardArrowDown className="ml-2 h-5 w-5" />
              </button>
            )}
          >
            <Dropdown.Item>2024</Dropdown.Item>
            <Dropdown.Item>2023</Dropdown.Item>
            <Dropdown.Item>2022</Dropdown.Item>
            <Dropdown.Item>2021</Dropdown.Item>
            <Dropdown.Item>2020</Dropdown.Item>
            <Dropdown.Item>2019</Dropdown.Item>
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
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid gap-7 lg:grid-cols-5 p-1 pl-18 relative">
        {posts.map((item, index) => (
          <div
            className="w-full rounded-lg shadow-md bg-white lg:max-w-sm relative"
            key={index}
            style={{ cursor: "pointer" }}
          >
            <img
              className="object-cover w-full h-64 rounded-t-lg"
              src={item.img}
              alt="image"
              style={{ transition: "transform 0.5s" }}
              onMouseOver={(e) => {
                (e.target as HTMLImageElement).style.transform = "scale(1.03)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLImageElement).style.transform = "scale(1)";
              }}
            />
            <div className="p-4 rounded-b-lg">
              <h4 className="text-l font-semibold">{item.title}</h4>
              <p className="mb-2 leading-normal text-xs">{item.content}</p>
              <p className="mb-2 leading-normal text-xs">Report ID: {item.id}</p>
              <p className="mb-2 leading-normal text-xs">Submission Date: {item.submissionDate}</p>
              <div className="flex justify-between">
                <div className="flex">
                  <PrintButtonAdmin reportId={item.id.toString()} />
                  <p
                    className="mb-2 leading-normal text-xs font-normal"
                    style={{ color: "#2d3748" }}
                  >
                    {item.date}
                  </p>
                </div>
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      id="apple-imac-27-dropdown-button"
                      data-dropdown-toggle="apple-imac-27-dropdown"
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
                  <Dropdown.Item as={Link} to="/admin/microanalytics">
                    Generate Report
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/logs">
                    Edit Logs
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentGrid;
