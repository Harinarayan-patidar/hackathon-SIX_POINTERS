import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';

function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useOnClickOutside(ref, () => setOpen(false));

  const toggleSidebar = () => {
    setOpen(!open);
  };

  if (!user) return null;
  console.log("User details :-", user);

  return (
    <div className="relative inline-block">
      {/* Button for toggling dropdown */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-2 bg-transparent text-white px-4 py-2 rounded-lg focus:outline-none"
      >
        <img src={user?.image} alt="User Avatar" className="w-8 h-8 rounded-full" />
        <FaCaretDown className="text-white" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          ref={ref}
          className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10"
        >
          {/* <Link
            to="/dashboard/my-profile"
            className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-t-lg"
            onClick={() => setOpen(false)}
          >
            <img src={user?.image} alt="User Avatar" className="w-6 h-6 rounded-full" />
            <span>My Profile</span>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex items-center space-x-2 p-3 hover:bg-gray-700 rounded-b-lg cursor-pointer"
          >
            <IoIosLogOut className="text-xl" />
            <span>Logout</span>
          </div>
          */}

          
        {/* making side bar from here */}

  <div className='bg-white '>
  {/* Sidebar toggle button */}
  <button
    onClick={toggleSidebar}
    className="fixed top-20 left-10 z-20 p-3 bg-blue-100 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none"
  >
    {setOpen ? <FaTimes /> : <FaBars />}
  </button>

  {/* Sidebar */}
  <div
    className={`fixed top-22 left-0 h-full py-3 bg-white text-black transition-all duration-300 ease-in-out z-10 transform ${
      setOpen ? 'w-64' : 'w-0'
    } overflow-hidden shadow-lg`}
  >
    {/* Sidebar content */}
    <ul className="pt-16 space-y-2 px-4">
      <li>
        <Link
          to="/dashboard/my-profile"
          onClick={() => setOpen(false)}
          className="hover:bg-gray-700 py-3 px-4 rounded-lg block transition-all duration-200"
        >
          My Profile
        </Link>
      </li>
      <li>
      {user?.accountType === "Student" ? (
             <Link
               to="/dashboard/my-courses"
               onClick={() => setOpen(false)}
               className="hover:bg-gray-700 py-3 px-4 rounded-lg block transition-all duration-200"
             >
               My Courses
             </Link>
           )            : user?.accountType === "Instructor" ? (
             <Link
               to="/dashboard/create-courses"
               onClick={() => setOpen(false)}
               className="hover:bg-gray-700 py-3 px-4 rounded-lg block transition-all duration-200"
             >
               Create Course
             </Link>
           ) : null}
      </li>
      <li>
        <Link
         
          onClick={() => {
            dispatch(logout(navigate));
            setOpen(false);
          }}
          className="hover:bg-gray-700 py-3 px-4 rounded-lg block transition-all duration-200"
        >
          Logout
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/settings"
          onClick={() => setOpen(false)}
          className="hover:bg-gray-700 py-3 px-4 rounded-lg block transition-all duration-200"
        >
          Settings
        </Link>
      </li>
    </ul>
  </div>

  {/* Main content (if needed) */}
  <div className="content ml-0 lg:ml-64 transition-all duration-300">
    {/* Add your main content here */}
  </div>
               </div>


        </div>
       

        
      )}

     
       
    
    </div>
  );
}

export default ProfileDropDown;
