import React from "react";

const Analytics: React.FC = () => {
  return (
    <div>
        <div className="grid grid-cols-3 gap-4 py-2 mb-6">

        {/* 1st tab */}
        <div className="flex items-center justify-center h-72 rounded bg-gray-100">
        <div className="max-w-sm w-full bg-white rounded-lg my-2 h-64 shadow md:p-3">
        <div>
        <h2 className="py-3 text-2xl font-bold">College of Information and Computing Sciences</h2>
        </div>
        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200">
            <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center me-3">
            <img className="w-10 h-10 m-2.5 ms-1.5" src="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png" alt="UST Seal" />
            </div>
            <div>
                <h5 className="leading-none text-2xl font-bold text-gray-900 pb-1">3.4k</h5>
                <p className="text-sm font-normal text-gray-500">Risk Generated</p>
            </div>x
            </div>
            <div>
            <span className="bg-yellow-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                </svg>
                42.5%
            </span>

            </div>
        </div>

        <div className="grid grid-cols-2">
            <dl className="flex items-center">
                <dt className="text-gray-500 text-sm font-normal me-1">Risk:</dt>
                <dd className="text-gray-900 text-sm font-semibold">33%</dd>
            </dl>
            <dl className="flex items-center justify-end">
                <dt className="text-gray-500 text-sm font-normal me-1">Sample Data:</dt>
                <dd className="text-gray-900 text-sm font-semibold">1.2%</dd>
            </dl>
        </div>

        <div id="column-chart"></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
            <div className="flex justify-between items-center pt-5">

                <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="lastDaysdropdown"
                data-dropdown-placement="bottom"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
                type="button">
                Last 7 days
                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="https://www.ust.edu.ph/wp-content/uploads/2020/02/UST-Seal-Institute-of-Information-Computing-Sciences-2014-Present-868x1024.png" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
                </button>

                <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yesterday</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Today</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 7 days</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 30 days</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 90 days</a>
                    </li>
                    </ul>
                </div>
                <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-yellow-500 hover:text-yellow-600 hover:bg-gray-100 px-3 py-2">
                Leads Report
                <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                </a>
            </div>
            </div>
            </div>
            </div>

            {/* 2nd tab */}
            <div className="flex items-center justify-center h-72 rounded bg-gray-100">
            <div className="max-w-sm w-full bg-white rounded-lg h-64 my-2 shadow p-10 md:p-3">
            <div>
            <h2 className="py-3 text-2xl font-bold">College of Information and Computing Sciences</h2>
            </div>
            <div className="flex justify-between mb-5">
                <div className="grid gap-4 grid-cols-2">
                <div>
                    <h5 className="inline-flex items-center text-gray-500 leading-none font-normal mb-2">Risk
                    <svg data-popover-target="clicks-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div data-popover id="clicks-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72">
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900">Clicks growth - Incremental</h3>
                            <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                            <h3 className="font-semibold text-gray-900">Calculation</h3>
                            <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                            <a href="#" className="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg></a>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                    </h5>
                    <p className="text-gray-900 text-2xl leading-none font-bold">42,3k</p>
                </div>
                <div>
                    <h5 className="inline-flex items-center text-gray-500 leading-none font-normal mb-2">Sample Data
                    <svg data-popover-target="cpc-info" data-popover-placement="bottom" className="w-3 h-3 text-gray-400 hover:text-gray-900 cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div data-popover id="cpc-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72">
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900">CPC growth - Incremental</h3>
                            <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                            <h3 className="font-semibold text-gray-900">Calculation</h3>
                            <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                            <a href="#" className="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg></a>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                    </h5>
                    <p className="text-gray-900 text-2xl leading-none font-bold">$5.40</p>
                </div>
                </div>
                <div>
                <button id="dropdownDefaultButton"
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom" type="button" className="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Last week <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg></button>
                <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yesterday</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Today</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 7 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 30 days</a>
                        </li>
                        <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 90 days</a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            <div id="line-chart"></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between mt-2.5">
                <div className="pt-5">      
                <a href="#" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none rounded-lg text-center">
                    <svg className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z"/>
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                    </svg>
                    View full report
                </a>
                </div>
            </div>
            </div>
            </div>

            {/* 3rd tab */}
            <div className="flex items-center justify-center h-72 rounded bg-gray-100">  
            <div className="max-w-sm w-full bg-white rounded-lg my-2 h-64 shadow md:p-1">
            <div>
            <h2 className="py-1 text-xl font-bold">College of Information and Computing Sciences</h2>
            </div>
            <div className="flex justify-between border-gray-200 border-b pb-1 ">
                <dl>
                <dt className="text-base font-normal text-gray-500 pb-1">Profit</dt>
                <dd className="leading-none text-3xl font-bold text-gray-900">$5,405</dd>
                </dl>
                <div>
                <span className="bg-yellow-500 text-white text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                    <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                    </svg>
                    Profit rate 23.5%
                </span>
                </div>
            </div>

            <div className="grid grid-cols-2 py-3">
                <dl>
                <dt className="text-base font-normal text-gray-500 pb-1">Income</dt>
                <dd className="leading-none text-xl font-bold text-green-800">$23,635</dd>
                </dl>
                <dl>
                <dt className="text-base font-normal text-gray-500 pb-1">Expense</dt>
                <dd className="leading-none text-xl font-bold text-red-800">-$18,230</dd>
                </dl>
            </div>

            <div id="bar-chart"></div>
                <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
                <div className="flex justify-between items-center pt-5">
                    <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="lastDaysdropdown"
                    data-dropdown-placement="bottom"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
                    type="button">
                    Last 6 months
                    <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yesterday</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Today</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 7 days</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 30 days</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 90 days</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last 6 months</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Last year</a>
                        </li>
                        </ul>
                    </div>
                    <a
                    href="#"
                    className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-yellow-500 hover:text-blue-700 hover:bg-gray-100 px-3 py-2">
                    Revenue Report
                    <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* 4th tab */}
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
            <p className="text-2xl text-gray-400">
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
            </p>
        </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="flex items-center justify-center rounded bg-gray-50 h-28">
            <p className="text-2xl text-gray-400">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
        </div>

         <div className="flex items-center justify-center rounded bg-gray-50 h-28">
            <p className="text-2xl text-gray-400">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>

         <div className="flex items-center justify-center rounded bg-gray-50 h-28">
            <p className="text-2xl text-gray-400">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>

         <div className="flex items-center justify-center rounded bg-gray-50 h-28">
            <p className="text-2xl text-gray-400">
               <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
               </svg>
            </p>
         </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
         <p className="text-2xl text-gray-400">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
      </div>
    );
};

export default Analytics;