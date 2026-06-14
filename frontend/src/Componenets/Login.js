import React, { useState, useReducer } from 'react';
import loginimg from '../Assets/login.png';
import cnaslogo from '../Assets/cnaslogo.png';
import esilogo from '../Assets/esilogo.png';
import { AuthData } from '../Auth/AuthWrapper';

const Login = () => {
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (state, newItem) => ({ ...state, ...newItem }),
    { email: '', password: '' }
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const doLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Email and password are required.');
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-row justify-center items-center w-full h-screen"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.13) 1.5px, transparent 1.5px), linear-gradient(135deg,#004080 0%,#1a5fa8 55%,#3b82f6 100%)',
        backgroundSize: '22px 22px, cover',
        backgroundRepeat: 'repeat, no-repeat',
      }}
    >
      <a href='/' className='absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-1 pl-2 pr-3 gap-1 text-white flex flex-row items-center text-sm font-medium transition-all'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </a>

      <div className="bg-white w-2/3 gap-0 md:w-1/2 h-1/2 md:h-2/3 rounded-md flex flex-row relative">
        <div className="hidden md:block overflow-hidden opacity-80 rounded-md">
          <img src={loginimg} alt="login" className="h-full blur-sm contrast-125" />
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2 ml-0 md:ml-10 py-8 px-4 gap-5 relative">
          <img src={cnaslogo} alt="cnaslogo" className="w-16 hidden md:absolute bottom-3 -left-24 transform -translate-x-1/2 md:flex flex-row items-center" />
          <img src={esilogo} alt="esi sba logo" className="w-20 hidden md:absolute bottom-10 -left-10 transform -translate-x-1/2 md:flex flex-row items-center" />

          <h1 className="text-xl font-semibold">Sign In</h1>

          <div className="relative w-full">
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

          <div className="relative w-full">
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
            <div className="text-red-600 text-sm w-full">{errorMessage}</div>
          )}

          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="flex flex-row gap-1">
              <input type="checkbox" name="save" className="mt-[2px]" />
              <p>Remember Me</p>
            </div>
            <div className="flex justify-end">
              <a href="/forget-pwd" className="text-blue-500 underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            onClick={doLogin}
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
