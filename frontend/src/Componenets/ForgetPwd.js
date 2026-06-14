import React, { useState } from 'react';
import login from '../Assets/login.png';
import cnaslogo from '../Assets/cnaslogo.png';
import esilogo from '../Assets/esilogo.png';

const ForgetPwd = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
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
      <a href='/login' className='absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full py-1 pl-2 pr-3 gap-1 text-white flex flex-row items-center text-sm font-medium transition-all'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </a>

      <div className="bg-white w-2/3 md:w-1/2 h-1/2 md:h-2/3 rounded-md flex flex-row relative">
        <div className="hidden md:block overflow-hidden opacity-80 rounded-md">
          <img src={login} alt="login" className="h-full blur-sm contrast-125" />
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2 ml-0 md:ml-10 py-8 px-4 gap-5 relative">
          <img src={cnaslogo} alt="cnaslogo" className="w-16 hidden md:absolute bottom-3 -left-24 transform -translate-x-1/2 md:flex flex-row items-center" />
          <img src={esilogo} alt="esi sba logo" className="w-20 hidden md:absolute bottom-10 -left-10 transform -translate-x-1/2 md:flex flex-row items-center" />

          <h1 className="text-xl font-semibold">Forgot Password</h1>
          <p className="text-sm text-gray-500 text-center">Enter your email to receive a reset link.</p>

          {submitted ? (
            <div className="w-full text-center px-4 py-6 bg-green-50 border border-green-200 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-green-500 mx-auto mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-green-700 font-medium text-sm">If that email is registered, you'll receive a reset link shortly.</p>
              <a href="/login" className="mt-3 inline-block text-pblue text-sm underline">Back to login</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="peer border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <label
                  htmlFor="email"
                  className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-blue-500 transition-all"
                >
                  Email
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPwd;
