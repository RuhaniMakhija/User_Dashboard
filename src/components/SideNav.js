import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className='bg-blue-200 h-[90vh] w-[15vw] fixed z-10 top-[10%] left-0'>
      <div className='flex items-center p-4 font-bold text-lg shadow-lg  border-gray-200 cursor-pointer'>
        <MdDashboard className='mr-4'/>
        <p>
          <Link to="/">User Details</Link>
        </p>
      </div>
      <div className='flex items-center p-4 font-bold text-lg shadow-lg  border-gray-200 cursor-pointer'>
        <FaCircleUser className='mr-4'/>
        <p>
          <Link to="/create">Account Creation</Link>
        </p>
      </div>
     
    </div>
  )
}

export default SideNav

