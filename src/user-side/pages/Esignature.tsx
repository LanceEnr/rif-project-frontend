import React from "react";
import { Link } from 'react-router-dom';


const Esignature: React.FC = () => {
  return (
    <>
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
 <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
      Settings
        </h2>
  
<hr className="h-px my-8 border-yellow-500 border-2"/>

      </div>  <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
    <div className="relative my-4 w-56 sm:hidden">
      <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
      <label  className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-yellow-500 peer-checked:ring">Accounts </label>
      <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">Accounts</li>
        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">Team</li>
        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-yellow-500 hover:text-white">Others</li>
      </ul>
    </div>

    <div className="col-span-2 hidden sm:block">
      <ul>
      <Link to="/prerequisites"> <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-yellow-500 hover:text-yellow-500">Prerequisites</li></Link>
        <li className="mt-5 cursor-pointer border-l-2 border-l-yellow-500 px-2 py-2 font-semibold text-yellow-500 transition hover:border-l-yellow-500 hover:text-yellow-500">E-Signature Upload</li>

      </ul>
    </div>

    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">E-Signature Upload</h1>
      </div>
      <hr className="mt-4 mb-8" />
      <div className="mb-10">
      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Upload your E-signature</label>
      <img className=" h-36 rounded" src="https://www.signwell.com/assets/vip-signatures/muhammad-ali-signature-3f9237f6fc48c3a04ba083117948e16ee7968aae521ae4ccebdfb8f22596ad22.svg" alt="Large avatar"/>

<div className="flex items-center justify-center w-full mb-4    ">

    <label  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload your E-signature</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400"> PNG or JPG (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
    
</div> 

<button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5">
      Save all
    </button>
    </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Esignature;
