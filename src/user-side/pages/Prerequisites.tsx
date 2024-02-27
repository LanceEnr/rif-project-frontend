import React from "react";
import { Link } from 'react-router-dom';


const Prerequisites: React.FC = () => {
  return (
    <>
    <div className="max-w-screen-xl mx-auto px-4 bg-white min-h-screen my-24">
 <div className="flex flex-col items-right">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">
      Settings
        </h2>
  
<hr className="h-px my-8 border-yellow-500 border-2"/>

      </div>
  <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
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
   <li className="mt-5 cursor-pointer border-l-2 border-l-yellow-500 px-2 py-2 font-semibold text-yellow-500 transition hover:border-l-yellow-500 hover:text-yellow-500">Prerequisites</li>
      <Link to="/esignature"> <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-yellow-500 hover:text-yellow-500">E-Signature Upload</li></Link>

      </ul>
    </div>

    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">Prerequisites</h1>
      </div>
      <hr className="mt-4 mb-8" />
     


      <div className="mb-10">
      

<form action="#">
    <div className="grid gap-4 mb-4 sm:grid-cols-1">
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Administrative/Academic Unit</label>
        <input type="text" name="username" id="username" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="e.g. College of Education"/>
      </div>

      <div className="relative w-full">
<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Internal Client/Stakeholder</label>
<div className="relative">
<input 
type="text" 
name="username" 
id="username" 
className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
placeholder="e.g. Academic Staff" 
required 
/>
<button type="button" className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-500 hover:bg-yellow-600 ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
</svg>
</button>
</div>
</div>



<div className="relative w-full">
<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">External Client/Stakeholder</label>
<div className="relative">
<input 
type="text" 
name="username" 
id="username" 
className="block p-2.5 w-full bg-white z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" 
placeholder="e.g. Parents & Guardians" 
required 
/>
<button type="button" className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-500 hover:bg-yellow-600 ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
</svg>
</button>
</div>
</div>
    </div>
    <button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5">
      Save all
    </button>

  </form>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Prerequisites;
