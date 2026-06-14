import React from 'react'
import Logo from '../Assets/Logo.svg'
import logo2 from '../Assets/logo2.png'
import profile from '../Assets/profile.png'
import { AuthData } from '../Auth/AuthWrapper'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate();
  const { User, logout } = AuthData();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='flex flex-row w-full h-screen font-poppins fixed'>
      <div className='w-1/6 h-screen flex flex-col shadow-md bg-white'>
        <div className='w-full py-3 md:py-4 flex justify-center'>
          <img src={Logo} alt='logo' className='w-32 hidden md:block' />
          <img src={logo2} alt='logo' className='w-9 block md:hidden' />
        </div>
        <div className='flex flex-col justify-between h-full py-6'>
          <div className='flex flex-col gap-3'>
            <Link to='employees' className='flex flex-row gap-3 px-6 w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <p className='hidden md:block'>Employee list</p>
            </Link>
            <Link to='committees' className='flex flex-row gap-3 px-6 w-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <p className='hidden md:block'>Committee list</p>
            </Link>
          </div>
          <div className='flex flex-col gap-3'>
            <button className='flex flex-row gap-3 px-6 w-full' aria-label="Help">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <p className='hidden md:block'>Help</p>
            </button>
            <button onClick={handleLogout} className='flex flex-row gap-3 px-6 w-full' aria-label="Log out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              <p className='hidden md:block'>Log out</p>
            </button>
          </div>
        </div>
      </div>

      <div className='w-5/6 h-full flex flex-col'>
        <div className='w-full flex flex-row py-4 justify-between pl-6 pr-6 items-center bg-white shadow-sm'>
          <div className='text-xl font-bold text-dblue'>Admin Panel</div>
          <div className='flex flex-row items-center gap-3'>
            <span className='hidden md:block text-sm text-gray-600'>{User?.fullName}</span>
            <div className='w-10 h-10 rounded-full overflow-hidden'>
              <img src={profile} alt='profile' />
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
