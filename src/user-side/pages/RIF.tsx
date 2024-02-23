import React, { FC } from 'react';

const RIF: FC = () => (
  <section className="relative bg-gray-50" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/400_Year_old_Beauty.jpg/1200px-400_Year_old_Beauty.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative z-10">    
  <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl p-8">
    {/* STEPPER */}
    <div className="flex items-center max-w-screen-lg mx-auto mb-5">
      <div className="flex items-center w-full">
        <div className="w-8 h-8 shrink-0 mx-[-1px] bg-yellow-500 p-1.5 flex items-center justify-center rounded-full">
          <span className="text-base text-white font-bold">1</span>
        </div>
        <div className="w-full h-1 bg-yellow-500"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="w-8 h-8 shrink-0 mx-[-1px] bg-yellow-500 p-1.5 flex items-center justify-center rounded-full">
          <span className="text-base text-white font-bold">2</span>
        </div>
        <div className="w-full h-1 bg-yellow-500"></div>
      </div>
      <div className="flex items-center w-full">
        <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
          <span className="text-base text-white font-bold">3</span>
        </div>
        <div className="w-full h-1 bg-gray-300"></div>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
          <span className="text-base text-white font-bold">4</span>
        </div>
      </div>
    </div>


        <form action="#">
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900">Risk Identification Form</h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Administrative/Academic Unit</label>
              <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="e.g. College of Education"/>
            </div>

            <div className="relative w-full">
  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Internal Client/Stakeholder</label>
  <div className="relative">
  <input 
  type="text" 
  name="username" 
  id="username" 
  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
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
  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" 
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
          <button type="submit" className="text-white bg-yellow-500 w-full font-medium rounded-lg text-sm px-5 py-2.5">
            Next Step
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default RIF;
