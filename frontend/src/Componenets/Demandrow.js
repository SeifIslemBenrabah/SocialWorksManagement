import React from 'react';

const Demandrow = ({ name, Programme, date, state, img }) => {
  // Define the color based on the state value
  const getStatusColor = (state) => {
    switch (state.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className='flex flex-row justify-between items-center w-full space-x-4 border-[0.4px] rounded-md border-gray-300 p-0 md:p-2'>
      <img src={img} alt={name} className='hidden md:block w-14 h-14 rounded-full object-cover' />
      <div className='flex flex-row items-center w-full md:w-9/12 justify-between text-xs md:text-base'>
        <p className='font-semibold md:whitespace-nowrap'>{name}</p>
        <p className='md:whitespace-nowrap'>{Programme}</p>
        <p className='md:whitespace-nowrap'>{date}</p>
        {/* Replace status text with a colored div */}
        <div className={` ml-1 w-2 h-[5px]  md:w-3 md:h-3 rounded-full ${getStatusColor(state)}`}>
        </div>
      </div>
      <button className='p-1 md:p-2 bg-pblue text-white rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 md:size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      </button>
    </div>
  );
}

export default Demandrow;
