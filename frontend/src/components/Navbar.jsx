import { NavLink } from "react-router-dom";
import { FaCartShopping } from 'react-icons/fa6';

export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-900 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <div className="flex flex-1">
                <input type="text" placeholder="Search for products..." className="w-full max-w-xs bg-gray-100 text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* <!-- Logo --> */}

            <NavLink className="flex justify-center flex-shrink-0 items-center mr-4" to="/">
              {/* <img
                className="h-10 w-auto"
                src=""
                alt="web mart"
              /> */}
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >webmart</span
              >
            </NavLink>
            
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className='text-white hover:bg-gray-100 hover:text-black rounded-md px-3 py-2'
                  >Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  >Account
                </NavLink>
                <NavLink
                  to="/add-job"
                  className='text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  >
                  <FaCartShopping /> 
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}
