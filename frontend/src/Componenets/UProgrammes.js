import React from 'react';
import UserProgrammeCard from './UserProgrammeCard';

const UProgrammes= () => {
  let programmes = [
    {id:1,title:"Title", des:"Our program offers mobile health clinics that provide screenings, vaccinations, and health education..."},
    {id:2,title:"Title", des:"Our program offers mobile health clinics that provide screenings, vaccinations, and health education..."},
    {id:3,title:"Title", des:"Our program offers mobile health clinics that provide screenings, vaccinations, and health education..."},
    {id:4,title:"Title", des:"Our program offers mobile health clinics that provide screenings, vaccinations, and health education..."},
  ]
  return (
    <div className="flex flex-col w-full h-screen top-0 fixed">
      <div className="w-full flex flex-row py-5 justify-between pl-6 pr-6 items-center shadow-md bg-transparent">
        <div className="text-xl font-bold text-dblue">Programmes</div>
      </div>
      <div className="bg-secondary w-full flex-grow -z-10 flex items-center pl-32 pr-40">
        <div className='bg-white flex flex-col gap-4 w-10/12 h-[80vh] rounded-2xl px-7 pt-9 pb-5'>
        <div className='flex flex-col gap-2 md:gap-0 md:flex-row w-full justify-between'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative '>
            <div className='absolute top-3 left-2'>
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
              className="py-3 pl-10 border-[1px] border-black rounded-md focus:outline-none"
              placeholder="Search..."
            />
          </div>
          <select
            name="langageMaitrise"
            className='border-2 border-dblue focus:outline-none rounded-md py-1 px-2'
          >
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
          </select>
        </div>
      </div>
      <div className='overflow-auto w-full grid grid-cols-3 scrollbar-hide px-7 gap-2'>
  {programmes.map((item, index) => (
    <UserProgrammeCard key={index} id={item.id} title={item.title} des={item.des} />
  ))}
</div>
      
        </div>
      </div>
    </div>
  );
};

export default UProgrammes;