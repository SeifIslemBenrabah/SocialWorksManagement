import React from 'react'
import login from '../Assets/login.png'
import cnaslogo from '../Assets/cnaslogo.png'
import esilogo from '../Assets/esilogo.png'
const ForgetPwd = () => {
    return (
        <div className="flex flex-row justify-center items-center bg-gradient-to-b from-white to-blue-500 w-full h-screen">
          <div className="bg-white px-4 md:pr-4 md:px-0 w-2/3 md:w-1/2 h-1/2  md:h-2/3 rounded-md flex flex-row relative">
            {/* Background Image */}
            <div className="hidden md:block overflow-hidden opacity-80">
              <img src={login} alt="login" className="h-full blur-sm contrast-125" />
            </div>
    
            {/* Main Content */}
            <div className="flex flex-col items-center w-full md:w-1/2 md:ml-10 pt-10 md:pt-[86px] gap-5 relative overflow-visible">
            <a href='/login' className='absolute bottom-10 bg-blue-200 rounded-full py-1 pl-2 pr-3 gap-2 text-white flex flex-row'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p>Back to Login</p>
            </a>
              {/* Logos Positioned in the Middle */}
              <img src={cnaslogo} alt="cnaslogo" className="w-16 absolute bottom-3 -left-24 transform -translate-x-1/2 hidden  md:flex flex-row items-center" />
                <img src={esilogo} alt="esi sba logo" className="w-20 absolute bottom-10 -left-10 transform -translate-x-1/2 hidden  md:flex flex-row items-center " />
    
              <h1 className="text-xl font-semibold">Forget password!</h1>
              <h1 className='text-sm'>Enter your email to recive code & set new password</h1>
              {/* Email Input */}
              <div className="relative w-full max-w-sm">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  required
                  className="peer border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label
                  htmlFor="email"
                  className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-blue-500 transition-all"
                >
                  Email
                </label>
              </div>
    
              {/* Sign Up Button */}
              <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Comfirm
              </button>
            </div>
          </div>
        </div>
      );
    };

export default ForgetPwd
