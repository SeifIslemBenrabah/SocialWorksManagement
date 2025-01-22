import React from 'react'

const Programmes = () => {
  return (
    <div className='w-full flex flex-col pt-10 items-center gap-6'>
      <div className=' flex flex-row w-9/12 justify-between'>
        <div className='flex flex-row gap-4'>
            <div className='relative'>
                <div className='absolute top-2 left-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </div>
                <input type='search' className='p-2 pl-10 border-[1px] border-black rounded-md focus:outline-none' placeholder='Search...'/>
            </div>
            <button>
            Categorie
            </button>
        </div>
        <button>Programme</button>
      </div>
      <div className=' flex flex-col w-9/12 h-[420px] border-[1px] justify-between rounded-xl'>
    <div className='flex flex-row'>
        <select name="langageMaitrise" className='w-3/12'>
        <option value="php">PHP</option>
        <option value="js">JavaScript</option>
        <option value="jee">Java Enterprise Edition</option>
        <option value="Categorie">Categorie</option>
        </select>
    </div>
      </div>
    </div>
  )
}

export default Programmes
