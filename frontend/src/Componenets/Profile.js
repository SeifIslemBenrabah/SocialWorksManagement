import React from 'react'
import profile from '../Assets/profile.png'
const Profile = () => {
  return (
    <div className='w-full flex items-center justify-center bg-secondary font-poppins'>
       <div className='w-2/3 rounded-md bg-white mt-4'>
       <div className='flex flex-row justify-evenly w-full mt-4'>
       <div className='flex flex-col gap-2'>
        <img src={profile} alt='profile pic' className='w-44 h-44'/>
        <button className='bg-pblue py-1 rounded-md text-white'>Change pic</button>
        </div>
        <div className='flex flex-col mt-3'>
            <p className='font-bold text-2xl mb-6'>ESI SBA Committee</p>
            <div className='flex flex-row gap-4'>
            <p className='font-semibold'>User Name :</p>
            <p>Seif Islem Benrbah</p>
            </div>
            <div className='flex flex-row gap-4'>
            <p className='font-semibold'>User Role :</p>
            <p>President</p>
            </div>
        </div>
       </div>
       <div className="flex flex-col items-end p-8 bg-white rounded-lg shadow-md mx-auto">
  <div className=" flex flex-row items-center gap-3  w-full">
    <label htmlFor="email" className="block text-lg font-medium text-gray-700 whitespace-nowrap w-20">Email :</label>
    <input
      type="email"
      id="email"
      className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your email"
    />
  </div>
  
  <div className="flex flex-row items-center gap-3  w-full ">
    <label htmlFor="phone" className="block text-lg font-medium text-gray-700 whitespace-nowrap w-20">Phone :</label>
    <input
      type="tel"
      id="phone"
      className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your phone number"
    />
  </div>
  
  <div className="flex flex-row items-center gap-3 w-full mb-4">
    <label htmlFor="text" className="block text-lg font-medium text-gray-700 whitespace-nowrap w-20">Salary :</label>
    <input
      type="text"
      id="text"
      disabled
      className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
      placeholder="This field is disabled"
    />
  </div>
  
  <button className="p-2 bg-pblue w-4/12 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Change Password
  </button>
</div>

       </div>
    </div>
  )
}

export default Profile
