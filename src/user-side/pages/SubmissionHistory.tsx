import React from "react";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  img: string;
  content: string;
  date: string;
}

const SubmissionHistory: React.FC = () => {
  const posts: Post[] = [
    {
      title: "Document Sample 1",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 1",
      date: "2024-02-26",
    },
    {
      title: "Document Sample 2",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 2",
      date: "2024-03-26",
    },
    {
      title: "Document Sample 3",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 3",
      date: "2024-03-26",
    },
    {
      title: "Document Sample 4",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 4",
      date: "2024-03-26",
    },
    {
      title: "Document Sample 5",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 5",
      date: "2024-03-26",
    },
    {
      title: "Document Sample 6",
      img: "https://www.pdffiller.com/preview/332/872/332872673.png",
      content: "Sample 6",
      date: "2024-03-26",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
          Submission History
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
            View the submission history and track progress.
          </p>
          <form action="#" method="GET" className="hidden lg:block lg:pl-2">
            <label className="sr-only">Search</label>
            <div className="relative mt-1 lg:w-72">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />{" "}
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 "
                placeholder="Search"
              />
            </div>
          </form>
        </div>
        <hr className="h-px my-8 border-yellow-500 border-2" />
      </div>

      <div className="grid gap-7 lg:grid-cols-5 p-1 pl-18 relative">
        <Link
          to="/form"
          style={{
            cursor: "pointer",
            transition: "all 1s ease",
          }}
          className="bg-white rounded-lg p-4 flex justify-center items-center border-dashed border-2 border-gray-400"
          onMouseOver={(event) =>
            (event.currentTarget.style.boxShadow =
              "3px 3px 10px rgba(0,0,0,0.3)")
          }
          onMouseOut={(event) => (event.currentTarget.style.boxShadow = "none")}
        >
          <svg
            className="h-16 w-24 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </Link>
        {posts.map((item, index) => (
          <div
            className="w-full rounded-lg shadow-md lg:max-w-sm"
            key={index}
            style={{ cursor: "pointer" }}
          >
            <img
              className="object-cover w-full h-64 rounded-t-lg"
              src={item.img}
              alt="image"
              style={{ transition: "transform 1s" }}
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
              <div className="flex justify-between">
                <div className="flex">
                  <svg
                    className="h-6 w-6  text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  <svg
                    className="h-6 w-6 text-gray-800 mx-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p
                    className="mb-2 leading-normal text-xs font-normal"
                    style={{ color: "#2d3748" }}
                  >
                    {item.date}
                  </p>
                </div>
                <div className="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-three-dots-vertica"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionHistory;
