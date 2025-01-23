import React from 'react';

const ProgrammeCard = ({ title, status, des }) => {
  let statusClass = '';
  let statusText = '';

  // Conditional logic for status
  if (status === 'active') {
    statusClass = 'text-green-500'; // Green text for active
    statusText = 'Active';
  } else if (status === 'expired') {
    statusClass = 'text-red-500'; // Red text for expired
    statusText = 'Expired';
  } else {
    statusClass = 'text-blue-500'; // Blue text for all
    statusText = 'All';
  }

  return (
    <div className="flex flex-col border p-4 rounded-lg h-64">
  <div className="flex flex-row justify-between items-center mb-4">
    <h1 className="text-xl font-semibold">{title}</h1>
    <span className={`px-2 py-1 text-sm font-medium ${statusClass} border rounded`}>
      {statusText}
    </span>
  </div>
  <p className="text-gray-700 mt-2 flex-grow">{des}</p>
  <button className="flex flex-row justify-center items-center w-full mt-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
    Edit
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  </button>
</div>
  );
};

export default ProgrammeCard;
