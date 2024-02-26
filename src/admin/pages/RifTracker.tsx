import React from "react";

const RifTracker: React.FC = () => {
  return (
    <div className="w-screen-xl px-4 bg-white min-h-screen">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">RIF Tracker</h2>
        <div className="flex justify-between items-center">
          <p className="text-neutral-500 text-xl mt-3">
            For tracking RIF submissions by different units.
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

      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 mb-4"
      >
        <img
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
          src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Institute-of-Information-and-Computing-Sciences.png"
          alt=""
          style={{ width: "100px", padding: "16px" }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            College of Information and Computing Sciences
            <span className="bg-green-200 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              SUBMITTED
            </span>
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Lorem Ipsum ictum aliquam porta in condimentum ac integer
          </p>
        </div>
      </a>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 mb-4"
      >
        <img
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
          src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Engineering-850x1024.png"
          alt=""
          style={{ width: "100px", padding: "16px" }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Faculty of Engineering
            <span className="bg-red-200 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              INCOMPLETE
            </span>
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Lorem Ipsum ictum aliquam porta in condimentum ac integer
          </p>
        </div>
      </a>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 mb-4"
      >
        <img
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
          src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Civil-Law.png"
          alt=""
          style={{ width: "100px", padding: "16px" }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Faculty of Civil Law
            <span className="bg-green-200 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              SUBMITTED
            </span>
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Lorem Ipsum ictum aliquam porta in condimentum ac integer
          </p>
        </div>
      </a>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 mb-4"
      >
        <img
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
          src="https://www.ust.edu.ph/wp-content/uploads/2020/07/College-of-Tourism-and-Hospitality-Management.png"
          alt=""
          style={{ width: "100px", padding: "16px" }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            College of Tourism and Hospitality Management{" "}
            <span className="bg-green-200 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              SUBMITTED
            </span>
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Lorem Ipsum ictum aliquam porta in condimentum ac integer
          </p>
        </div>
      </a>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 mb-4"
      >
        <img
          className="object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
          src="https://www.ust.edu.ph/wp-content/uploads/2020/07/Faculty-of-Medicine-and-Surgery.png"
          alt=""
          style={{ width: "100px", padding: "16px" }}
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Faculty of Medicine and Surgery
            <span className="bg-red-200 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ml-2">
              INCOMPLETE
            </span>
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Lorem Ipsum ictum aliquam porta in condimentum ac integer
          </p>
        </div>
      </a>
    </div>
  );
};

export default RifTracker;
