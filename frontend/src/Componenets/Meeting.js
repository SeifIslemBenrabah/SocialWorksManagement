import React,{useState} from 'react'

const Meeting = () => {
    const [popupadd, setpopupadd] = useState(false);
    const [Members, setMembers] = useState([]); 
    const [availableMembers, setAvailableMembers] = useState([
        'Seif',
        'Islem',
        'Benrabah',
        'member1',
        'member2'
      ]);
    const addMember = (member) => {
        if (!Members.includes(member)) {
            setMembers((prev) => [...prev, member]);
          }
      };
      const removeMember = (index) => {
        setMembers((prev) => prev.filter((_, i) => i !== index));
      };
    
  return (
    <div className='w-full flex flex-col pt-6 items-center gap-5 md:gap-6 bg-white md:bg-secondary pb-7 font-poppins'>
          <div className=' flex flex-col gap-2 md:gap-0 md:flex-row w-full md:w-9/12 justify-between ml-11 md:ml-0'>
                <div className='relative '>
                    <div className='absolute top-3 left-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </div>
                    <input type='search' className='py-3 pl-10 border-[1px] border-black rounded-md focus:outline-none w-72' placeholder='Search...'/>
                </div>
                <button
            onClick={() => setpopupadd(true)}
          className='py-[6px] px-3 w-1/2 md:w-auto flex flex-row gap-2 justify-between items-center rounded-md bg-dblue text-white'
        >
          <p className='mb-[1px]'>Create Meet</p>
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
          <div className=' flex flex-col w-11/12 md:w-9/12 h-[140px] border-[1px] gap-2 rounded-xl overflow-hidden px-2 shadow-md bg-white2'>
        <div className='flex flex-col gap-3 md:gap-0 md:flex-row pt-4 w-full justify-between px-8'>
            <p className='text-dblue font-bold'>Comming Meet</p>
        </div>
        <div className='flex flex-col gap-1 px-1 pt-4 w-full justify-between border-y-[0.1px] border-gray-200 overflow-auto scrollbar-hide'>
        </div>
          </div>
          <div className=' flex flex-col w-11/12 md:w-9/12 h-[270px] border-[1px] gap-2 rounded-xl overflow-hidden px-2 shadow-md bg-white2'>
          <div className='flex flex-col gap-3 md:gap-0 md:flex-row pt-4 w-full justify-between px-8'>
            <p className='text-dblue font-bold'>Old Meetings</p>
        </div>
          <div className='flex flex-col gap-1 px-1 pt-4 w-full justify-between border-y-[0.1px] border-gray-200 overflow-auto scrollbar-hide'>
        </div>
        </div>
        {popupadd && (
  <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-gray-950 bg-opacity-10">
    <div className="w-11/12 md:w-1/3 h-5/6 overflow-hidden bg-white rounded-md flex flex-col items-center px-10 pt-2 gap-2 relative">
      <button onClick={() => setpopupadd(false)} className="absolute top-1 right-2 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <p className="text-dblue text-xl font-bold">Create Meet</p>
      <div className="flex flex-col items-start w-full">
        <label>Name</label>
        <input
          type="text"
          className="w-full py-1 px-3 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <label>Date</label>
        <input
          type="date"
          className="w-full py-1 px-3 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <label>Time</label>
        <input
          type="time"
          className="w-full py-1 px-3 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <p>Members</p>
        <select
          name="membersSelect"
          className="border-2 border-dblue focus:outline-none rounded-md px-2"
          onChange={(e) => {
            if (e.target.value !== "Categorie") {
              addMember(e.target.value);
            }
          }}
        >
          <option value="Categorie">Select Member</option>
          {availableMembers.map((member, index) => (
            <option key={index} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-full">
        <p className='text-dblue font-bold'>Meet Members</p>
        <div className="flex flex-col w-full overflow-auto min-h-3/4 scrollbar-hide px-1 border-[0.5px] rounded-md">
        {Members && Members.length > 0 ? (
  Members.map((member, index) => (
    <div key={index} className="flex items-center gap-2 mb-1">
      <span className="flex-1">{member}</span>
      <button
        onClick={() => removeMember(index)}
        className="py-1 px-1 bg-red-500 text-white rounded-md"
      >
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  ))
) : (
  <div className="w-full h-full flex flex-row justify-center items-center py-8 gap-1 text-yellow-500">
    <p>There is no member yet</p>
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
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  </div>
)}

        </div>
      </div>
      <button
        onClick={() => setpopupadd(false)}
        className="w-3/4 flex flex-row items-center bg-pblue justify-center gap-2 py-2 rounded-md text-white absolute bottom-4"
      >
        <p className="text-sm">Done</p>
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
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Z"
          />
        </svg>
      </button>
    </div>
  </div>
)}

        </div>
  )
}

export default Meeting
