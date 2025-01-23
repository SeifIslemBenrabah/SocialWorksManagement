import React, { useState } from 'react';
import ProgrammeCard from './ProgrammeCard';

const Programmes = () => {
  const [popupadd, setpopupadd] = useState(false);
  const [conditions, setConditions] = useState(['']); // Initial state for conditions
  const [addcat,setaddcat] = useState(false)
  const [categories, setCategories] = useState(['']); // Categories state
  // Function to handle adding a new condition
  const addCondition = () => {
    setConditions([...conditions, '']);
  };

  // Function to handle removing a specific condition
  const removeCondition = (indexToRemove) => {
    setConditions(conditions.filter((_, index) => index !== indexToRemove));
  };

  // Function to handle updating a condition's value
  const updateCondition = (indexToUpdate, value) => {
    setConditions(
      conditions.map((condition, index) =>
        index === indexToUpdate ? value : condition
      )
    );
  };
  const addCategory = () => setCategories([...categories, '']);
  const removeCategory = (indexToRemove) =>
    setCategories(categories.filter((_, index) => index !== indexToRemove));
  const updateCategory = (indexToUpdate, value) =>
    setCategories(
      categories.map((category, index) =>
        index === indexToUpdate ? value : category
      )
    );
  return (
    <div className='w-full flex flex-col pt-10 items-center gap-6 bg-secondary font-poppins pb-6'>
      <div className='flex flex-row w-9/12 justify-between'>
        <div className='flex flex-row gap-4'>
          <div className='relative'>
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
          <button onClick={()=>setaddcat(true)} className='py-[6px] px-3 flex flex-row gap-2 justify-between items-center rounded-md border-2 bg-white2 border-dblue text-dblue'>
            <p className='mb-1'>Categorie</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => setpopupadd(true)}
          className='py-[6px] px-3 flex flex-row gap-2 justify-between items-center rounded-md bg-dblue text-white'
        >
          <p className='mb-1'>Programme</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div className='flex flex-col w-9/12 h-[420px] border-[1px] justify-between rounded-xl overflow-hidden bg-white2'>
        <div className='flex flex-row pt-4 w-full justify-between px-8'>
          <select
            name="langageMaitrise"
            className='w-3/12 border-2 border-dblue focus:outline-none rounded-md py-1 px-2'
          >
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
            <option value="Categorie">Categorie</option>
          </select>
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
                className="px-4 py-2 font-semibold rounded-l-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
              >
                All
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="active"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="active"
                className="px-4 py-2 font-semibold cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
              >
                Active
              </label>
            </div>
            <div className="relative group">
              <input
                type="radio"
                id="expired"
                name="pageFilter"
                className="hidden peer"
              />
              <label
                htmlFor="expired"
                className="px-4 py-2 font-semibold rounded-r-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
              >
                Expired
              </label>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 grid-flow-row gap-x-3 gap-y-2 pt-4 w-full justify-between border-y-[0.1px] border-gray-200 px-8 mt-5 overflow-auto scrollbar-hide'>
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
          <ProgrammeCard title='Seif' status='active' des='seif islekadhgsajhbdkjna' />
        </div>
      </div>
      {popupadd && (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-950 bg-opacity-10'>
          <div className='w-1/3 h-5/6 overflow-hidden bg-white rounded-md flex flex-col items-center px-10 pt-2 gap-2 relative'>
          <button onClick={()=>setpopupadd(false)} className='absolute top-1 right-2 text-red-600'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          </button>
            <p className='text-dblue text-xl font-bold'>Add Programme</p>
            <div className='flex flex-col items-start w-full'>
              <label>Title</label>
              <input
              type="text"
              className="w-full py-1 px-3 border rounded-md focus:outline-none"
            />
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <p>Categorie</p>
              <select
                name="langageMaitrisePopup"
                className='border-2 border-dblue focus:outline-none rounded-md px-2'
              >
                <option value="Categorie">Categorie</option>
                <option value="Categorie">Categorie</option>
                <option value="Categorie">Categorie</option>
              </select>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <p>State</p>
              <div className="flex border-2 px-1  border-dblue rounded-lg overflow-hidden">
                <div className="relative group">
                  <input
                    type="radio"
                    id="activePopup"
                    name="popupState"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="activePopup"
                    className="px-4 text-sm font-semibold rounded-l-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
                  >
                    Active
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="radio"
                    id="expiredPopup"
                    name="popupState"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="expiredPopup"
                    className="px-4 text-sm  font-semibold rounded-r-md cursor-pointer bg-white text-dblue peer-checked:bg-dblue peer-checked:text-white hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-dblue"
                  >
                    Expired
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start w-full'>
        <label htmlFor="comment">Description</label>
        <textarea
          id="comment"
          className='w-full border-2 border-dblue rounded-md focus:outline-none py-1 px-2'
          placeholder="Enter your Description here..."
          rows={3}
        ></textarea>
      </div>
      <div className="flex flex-col w-full">
      <p>Conditions</p>
      <div className="flex flex-col w-full">
        {conditions.map((condition, index) => (
          <div key={index} className="flex items-center gap-[2px] mb-1">
            <input
              type="text"
              value={condition}
              onChange={(e) => updateCondition(index, e.target.value)}
              className="flex-1 py-1 px-3 border rounded-md focus:outline-none"
            />
            <button
              onClick={() => removeCondition(index)}
              className="py-1 px-1 bg-red-500 text-white rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addCondition}
        className="w-1/2 py-[6px] px-2 flex flex-row justify-between items-center rounded-md bg-dblue text-white mt-4"
      >
        <p className="text-sm">Add Condition</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
    <button onClick={() => setpopupadd(false)} className='w-3/4 flex flex-row items-center bg-pblue justify-center gap-2 py-2 rounded-md text-white absolute bottom-4'>
    <p className='text-sm'>Save changes</p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
    </button>
          </div>
        </div>
      )}
      {addcat&& (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-950 bg-opacity-10'>
          <div className='w-1/3 h-2/3 overflow-hidden bg-white rounded-md flex flex-col items-center px-10 pt-2 gap-2 relative'>
          <button onClick={()=>setaddcat(false)} className='absolute top-1 right-2 text-red-600'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          </button>
            <p className='text-dblue text-xl font-bold'>Categorie List</p>
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => updateCategory(index, e.target.value)}
                    className="flex-1 py-1 px-3 border rounded-md focus:outline-none"
                  />
                  <button
                    onClick={() => removeCategory(index)}
                    className="py-1 px-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addCategory}
                className="w-full py-2 mt-2 bg-dblue text-white rounded-md"
              >
                Add Category
              </button>
            <button onClick={() => setpopupadd(false)} className='w-3/4 flex flex-row items-center bg-pblue justify-center gap-2 py-2 rounded-md text-white absolute bottom-4'>
    <p className='text-sm'>Save changes</p>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
    </button>
          </div>
        </div>
          )}
    </div>
  );
};

export default Programmes;
