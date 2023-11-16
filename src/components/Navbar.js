import React from 'react';
import logo from "./../images/logo.png"

const Navbar = () => {
  return (
    <div className='flex bg-gray-300 items-center pr-10 h-[10vh] shadow-lg justify-between z-50 fixed top-0 left-0 w-[100%]'>
      <div>
        <img src={logo} alt='logo' className='w-[200px] ml-[20px]' width={200} height={100}/>
      </div>
      <div className='font-bold text-lg'>
        USER DASHBOARD
      </div>
    </div>
  )
}

export default Navbar
