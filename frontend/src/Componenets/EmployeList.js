import React from 'react';


const EmployeList = () => {
  const Employe =[
    {num:1, name:'Programme_name' ,date:'23/2/2023',state:"Accepted"},
    {num:2, name:'Programme_name' ,date:'23/2/2023',state:"complet"},
    {num:3, name:'Programme_name' ,date:'23/2/2023',state:"waiting"},
    {num:4, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:5, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:6, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:7, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
    {num:8, name:'Programme_name' ,date:'23/2/2023',state:"incomplet"},
  ]
  
  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-6 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">All employers</div>
      </div>      
      <div className="bg-secondary w-full flex-grow -z-10 grid grid-cols-5 gap-5">
      </div>
    </div>
  );
};

export default EmployeList;