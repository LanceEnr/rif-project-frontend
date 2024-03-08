import React from "react";

const Logs: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-18">
      <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">Edit History</h2>
        <p className="text-neutral-500 text-xl mt-3">#72682713</p>
        <hr className="h-px my-8 border-yellow-500 border-2" />
        <div className="mx-5 mr-3">
          <ol className="relative border-s border-gray-200">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img
                  className="rounded-full shadow-lg"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png"
                  alt="Bonnie image"
                />
              </span>
              <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  3:46 PM Monday, March 4, 2024 (GMT+8)
                </time>
                <div className="text-sm font-normal text-gray-500 lex ">
                  College of Computing Sciences edited the{" "}
                  <span className="font-semibold text-gray-900 ">SDA No.</span>
                </div>
              </div>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img
                  className="rounded-full shadow-lg"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png"
                  alt="Thomas Lean image"
                />
              </span>
              <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  3:46 PM Monday, March 4, 2024 (GMT+8)
                </time>
                <div className="text-sm font-normal text-gray-500 lex ">
                  College of Computing Sciences edited the{" "}
                  <span className="font-semibold text-gray-900 ">SDA No.</span>
                </div>
              </div>
            </li>
            <li className="ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img
                  className="rounded-full shadow-lg"
                  src="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png"
                  alt="Lance Enriquez image"
                />
              </span>
              <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  3:46 PM Monday, March 4, 2024 (GMT+8)
                </time>
                <div className="text-sm font-normal text-gray-500 lex ">
                  College of Computing Sciences edited the{" "}
                  <span className="font-semibold text-gray-900 ">SDA No.</span>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Logs;
