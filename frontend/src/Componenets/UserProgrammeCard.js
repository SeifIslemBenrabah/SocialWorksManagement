import React from 'react'
import { useNavigate } from 'react-router-dom';
const UserProgrammeCard = ({id, title,  des }) => {
  const navigate = useNavigate();
    const handleDetails = (Programme) => {
      // Navigate to product details page and pass state
      navigate(`/Users/programme/${Programme.id}`, { state: Programme });
    };
    return (
      <div className="flex flex-col border p-4 rounded-lg h-64">
    <div className="flex flex-row justify-center items-center mb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
    <p className='text-sm'>Description</p>
    <p className="text-gray-700 text-xs mt-2 flex-grow">{des}</p>
    <button onClick={()=>handleDetails({id, title,des})} className="flex flex-row justify-center items-center w-full mt-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
      See more
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </button>
  </div>
    );
  };

export default UserProgrammeCard
