import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#121212' }} className="  fixed w-full z-20 top-0 start-0 border-b border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.15752-9/426963797_1083902849549118_5791859232688171486_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=SLqvOkzzRY4AX-eGOLW&_nc_ht=scontent.fmnl25-1.fna&oh=03_AdQg1yKPWUhRV8ynkQ8WmwT1SIV8OCwl_23mWq9ZTM8E3g&oe=65F263F0" className="h-8" alt="Flowbite Logo"/>
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">YellowAlert</span>
    </a>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="    font-medium rounded text-sm px-4 py-2 text-center bg-yellow-500  ">Login</button>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10      h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul style={{ backgroundColor: '#121212' }} className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
  <li>
    <Link to="/" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0">Home</Link>
  </li>
  <li>
    <Link to="/RIF" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0  ">Form</Link>
  </li>
  <li>
    <Link to="/faqs" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0  ">FAQs</Link>
  </li>
  <li>
    <Link to="/contact" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0  ">Contact</Link>
  </li>
</ul>
    </div>
    </div>
  </nav>
  )
}

export default Navbar