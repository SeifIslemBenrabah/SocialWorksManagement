import React from 'react';

import profile from '../Assets/profile.png'
import EmployeCard from './EmployeCard';
const CommiteList = () => {
  const Employe =[
    {id:1, name:'user_name' ,img:profile},
    {id:2, name:'user_name' ,img:profile},
    {id:3, name:'user_name' ,img:profile},
    {id:4, name:'user_name' ,img:profile},
    {id:5, name:'user_name' ,img:profile},
    {id:6, name:'user_name' ,img:profile},
    {id:7, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
    {id:8, name:'user_name' ,img:profile},
  ]
  
  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-6 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">All Commite employers</div>
      </div>      
      <div className="bg-secondary w-full flex-grow -z-10 ">
        <div className=' w-10/12 h-screen overflow-scroll grid grid-cols-5 gap-4 p-7 scrollbar-hide'>
        {Employe.map((employe)=>(
          <EmployeCard img={employe.img} name={employe.name}/>
        ))
        }
        </div>
      </div>
    </div>
  );
};

export default CommiteList;