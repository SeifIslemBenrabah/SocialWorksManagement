import React from 'react'
import Demandrow from './Demandrow'
import profile from '../Assets/profile.png'
const Demand = () => {
    return (
        <div className='w-full flex flex-col pt-10 items-center gap-16 md:gap-6 bg-white md:bg-secondary pb-7 font-poppins'>
          <div className=' flex flex-row w-full md:w-9/12 justify-between ml-11 md:ml-0'>
                <div className='relative '>
                    <div className='absolute top-3 left-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </div>
                    <input type='search' className='py-3 pl-10 border-[1px] border-black rounded-md focus:outline-none w-72' placeholder='Search...'/>
                </div>
          </div>
          <div className=' flex flex-col w-11/12 md:w-9/12 h-[420px] border-[1px] gap-2 rounded-xl overflow-hidden px-2 shadow-md bg-white2'>
        <div className='flex flex-col gap-3 md:gap-0 md:flex-row pt-4 w-full justify-between px-8'>
            <select name="langageMaitrise" className='w-full md:w-3/12 border-2 border-dblue focus:outline-none rounded-md py-1 px-2'>
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
            </select>
            <div class="flex border-2 px-1 py-2 border-dblue rounded-lg overflow-hidden">
      <div class="relative group">
        <input
          type="radio"
          id="all"
          name="filter"
          class="hidden peer"
          
        />
        <label
          for="all"
          class="px-4 py-2 font-semibold rounded-l-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
        >
          All
        </label>
      </div>
    
      <div class="relative group">
        <input
          type="radio"
          id="Valid"
          name="filter"
          class="hidden peer"
        />
        <label
          for="Valid"
          class="px-4 py-2 font-semibold cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
        >
          Valid
        </label>
      </div>
    
      <div class="relative group">
        <input
          type="radio"
          id="Waiting"
          name="filter"
          class="hidden peer"
        />
        <label
          for="Waiting"
          class="px-4 py-2 font-semibold  cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
        >
          Waiting
        </label>
      </div>
      <div class="relative group">
        <input
          type="radio"
          id="Reject"
          name="filter"
          class="hidden peer"
        />
        <label
          for="Reject"
          class="px-4 py-2 font-semibold rounded-r-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
        >
          Reject
        </label>
      </div>
    </div>
        </div>
        <div className='flex flex-row py-2 w-full justify-between text-xs md:text-base md:px-28 bg-pblue bg-opacity-10 items-center rounded-2xl'>
            <p>Employee Name</p>
            <p>Programme Name</p>
            <p>Date</p>
            <p>state</p>
        </div>
        <div className='flex flex-col gap-1 px-1 pt-4 w-full justify-between border-y-[0.1px] border-gray-200 overflow-auto scrollbar-hide'>
        <Demandrow
        name="SeifIslem Benrabah"
        Programme="Web Development"
        date="January 22, 2025"
        state="Active"
        img={profile}
      />
      <Demandrow
        name="SeifIslem Benrabah"
        Programme="Web Development"
        date="January 22, 2025"
        state="Active"
        img={profile}
      />
      <Demandrow
        name="SeifIslem Benrabah"
        Programme="Web Development"
        date="January 22, 2025"
        state="Active"
        img={profile}
      />
      <Demandrow
        name="SeifIslem Benrabah"
        Programme="Web Development"
        date="January 22, 2025"
        state="Active"
        img={profile}
      />
      <Demandrow
        name="SeifIslem Benrabah"
        Programme="Web Development"
        date="January 22, 2025"
        state="Active"
        img={profile}
      />
        </div>
          </div>
        </div>
      )
}

export default Demand
