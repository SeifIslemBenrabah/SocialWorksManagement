import React, { useState } from 'react';
import UserDemandrow from './UserDemandrow';

const UDemand = () => {
  const Demand =[
    {num:1, name:'Programme_name' ,date:'23/2/2023',state:"Accepted"},
    {num:2, name:'Programme_name' ,date:'23/2/2023',state:"complet"},
    {num:3, name:'Programme_name' ,date:'23/2/2023',state:"waiting"},
    {num:4, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:5, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:6, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:7, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:8, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
  ]
  const [popup,setpopup] = useState(false)
  const [detail,setdetail] = useState({})
  const demandDetail =(item)=>{
    setpopup(true)
    setdetail(item)
  }
  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      {popup && (
          <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-950 bg-opacity-10'>
          <div className='w-11/12 md:w-5/12 h-5/6 overflow-hidden bg-white rounded-md flex flex-col items-center px-10 pt-2 gap-2 relative'>
          <div className='w-full flex flex-row items-center justify-between'>
          {detail.name}
          <div className='border-2 border-black p -1 rounded-lg'>
            {detail.state}
          </div>
          </div>
          <div className='w-full flex flex-col items-start'>
            <p>Description</p>
            <p>{detail.des}</p>
            <p>Requirements</p>
            <ol>
              <li></li>
            </ol>
            </div>
          </div>
          </div>
        )
        }
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-6 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">My Demand</div>
      </div>
      <div className="bg-secondary w-full flex-grow -z-10 flex items-center pl-32 pr-40">
        <div className='bg-white flex flex-col gap-4 w-10/12 h-[84vh] rounded-2xl px-4 pt-9 pb-5'>
        <div className='flex flex-col gap-2 md:gap-0 md:flex-row w-full justify-between'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative '>
            <div className='absolute top-2 left-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="py-2 pl-10 border-[1px] border-black rounded-md focus:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex border-2 px-1 py-2 border-dblue rounded-lg overflow-hidden">
            <div className="relative group">
              <input
                type="radio"
                id="all"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="all"
                className="px-4 py-1 rounded-l-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
              >
                All
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="Accepted"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="Accepted"
                className="px-4 py-1 cursor-pointer bg-white text-green-400 peer-checked:bg-green-500 peer-checked:text-white hover:bg-green-100 transition-colors duration-200 hover:text-green-800"
              >
                Accepted
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="Complet"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="Complet"
                className="px-4 py-1 cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
              >
                Complet
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="Waiting"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="Waiting"
                className="px-4 py-1 cursor-pointer bg-white text-orange-400 peer-checked:bg-orange-500 peer-checked:text-white hover:bg-orange-100 transition-colors duration-200 hover:text-orange-800"
              >
                Waiting
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="Incomplet"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="Incomplet"
                className="px-4 py-1 rounded-r-md cursor-pointer bg-white text-red-500 peer-checked:bg-red-600 peer-checked:text-white hover:bg-red-200 transition-colors duration-200 hover:text-red-800"
              >
                Incomplet
              </label>
            </div>
          </div>
      </div>
      <div className='flex flex-row py-2 w-full justify-around text-xs md:text-base md:px-28 bg-pblue bg-opacity-10 items-center rounded-2xl'>
            <p>Programme Name</p>
            <p>Date</p>
            <p>state</p>
        </div>
        <div className='overflow-auto w-full flex flex-col scrollbar-hide gap-2'>
  {Demand.map((item) => (
    <div className='flex flex-row border-[0.4px] rounded-md border-gray-300 p-3'>
    <UserDemandrow key={item.num} num={item.num} name={item.name} date={item.date} state={item.state} />
    <button onClick={()=>demandDetail(item)} className='p-1 md:p-2 bg-pblue text-white rounded-lg '>
    See Demand
  </button>
  </div>
  ))}
</div>
        </div>
        
      </div>
    </div>
  );
};

export default UDemand;