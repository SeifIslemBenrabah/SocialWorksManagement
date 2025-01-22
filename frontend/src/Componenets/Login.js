import React, { useState, useReducer } from 'react';
import loginimg from '../Assets/login.png';
import cnaslogo from '../Assets/cnaslogo.png';
import esilogo from '../Assets/esilogo.png';
import { AuthData } from '../Auth/AuthWrapper';
const Login = () => {
    const {login} = AuthData(); 
    const [formData, setFormData] = useReducer(
        (formData, newItem) => ({ ...formData, ...newItem }),
        { email: "", password: "" }
      );
      const [errorMessage, setErrorMessage] = useState(null);
    
      const doLogin = async (e) => {
        e.preventDefault();
        try {
          await login(formData.email, formData.password);
        } catch (error) {
          setErrorMessage("An error occurred during login.");
        }
      };
  return (
    <div className="flex flex-row justify-center items-center bg-gradient-to-b from-white to-blue-500 w-full h-screen">
      <div className="bg-white w-1/2 h-2/3 rounded-md flex flex-row relative">
        {/* Background Image */}
        <div className="overflow-hidden opacity-80 rounded-md">
          <img src={loginimg} alt="login" className="h-full blur-sm contrast-125" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center w-1/2 ml-10 py-8 gap-5 relative">
        <a href='/' className='absolute bottom-10 bg-blue-200 rounded-full py-1 pl-2 pr-3 gap-2 text-white flex flex-row'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <p>Back to home</p>
        </a>
          {/* Logos Positioned in the Middle */}
          <img src={cnaslogo} alt="cnaslogo" className="w-16 absolute bottom-3 -left-24 transform -translate-x-1/2  flex flex-row items-center" />
            <img src={esilogo} alt="esi sba logo" className="w-20 absolute bottom-10 -left-10 transform -translate-x-1/2  flex flex-row items-center " />

          <h1 className="text-xl font-semibold">Sign In</h1>

          {/* Email Input */}
          <div className="relative w-full max-w-sm">
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              className="peer border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            />
            <label
              htmlFor="email"
              className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-blue-500 transition-all"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative w-full max-w-sm">
            <input
              type="password"
              id="password"
              placeholder=" "
              required
              className="peer border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
            onChange={(e) => setFormData({ password: e.target.value })}
            />
            <label
              htmlFor="password"
              className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-blue-500 transition-all"
            >
              Password
            </label>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}
          {/* Remember Me & Forget Password */}
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-row justify-center gap-1">
              <input type="checkbox" name="save" className="mt-[2px]" />
              <p>Remember Me</p>
            </div>
            <a href="/ForgetPwd" className="text-blue-500 hover:underline">
              Forget Password?
            </a>
          </div>

          {/* Sign Up Button */}
          <button onClick={doLogin} className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
