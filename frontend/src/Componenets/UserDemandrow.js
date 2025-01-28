import React from 'react';

const UserDemandrow = ({ num,name, date, state}) => {
  // Define the color based on the state value
  const getStatusColor = (state) => {
    switch (state.toLowerCase()) {
      case 'accepted':
        return 'bg-green-500';
      case 'complet':
        return 'bg-yellow-300';
      case 'waiting':
        return 'bg-orange-500';
      case 'incomplet':
        return 'bg-red-500'
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className='flex flex-row justify-between items-center  w-10/12 space-x-4  pl-11 pr-11'>
      <div className='flex flex-row items-center w-full  justify-between  text-xs md:text-base'>
        <p className='font-semibold' >{num}.</p>
        <p className='font-semibold md:whitespace-nowrap'>{name}</p>
        <p className='md:whitespace-nowrap'>{date}</p>
        <div className={` ml-1 w-2 h-[5px]  md:w-3 md:h-3 rounded-full ${getStatusColor(state)}`}>
        </div>
      </div>
    </div>
  );
}

export default UserDemandrow;
