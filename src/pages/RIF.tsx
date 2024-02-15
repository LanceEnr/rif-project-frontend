import React, { FC } from 'react';

const RIF: FC = () => (
  <section className="bg-gray-100">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl p-5">
    <ol className="flex flex-row items-center justify-center w-full mb-4 sm:mb-5">
    <li className="flex w-full items-center text-black-600 dark:text-black-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-gray-800">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">
        <h1 className="font-bold">1</h1>
        </div>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-400">
        <div className="flex items-center text-gray-400 justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">     
              <h1 className="font-bold">2</h1>
        </div>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-400">
        <div className="flex items-center text-gray-400 justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">
              <h1 className="font-bold">3</h1>
        </div>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-400">
        <div className="flex items-center text-gray-400 justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">
              <h1 className="font-bold">4</h1>
        </div>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-400">
        <div className="flex items-center text-gray-400 justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">
          <h1 className="font-bold">5</h1>
        </div>
    </li>
    <li className="flex items-center w-full">
        <div className="flex items-center text-gray-400 justify-center w-10 h-10 bg-yellow-100 rounded-full lg:h-12 lg:w-12 dark:bg-yellow-400 shrink-0">
        <h1 className="font-bold">6</h1>
        </div>
    </li>
</ol>
        <form action="#">
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900">Invoice details</h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="username.example"/>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="•••••••••"/>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="•••••••••"/>
            </div>
          </div>
          <button type="submit" className="text-black bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Next Step: Payment Info
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default RIF;
